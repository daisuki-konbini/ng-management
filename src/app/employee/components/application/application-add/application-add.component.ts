import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SimpleService, Category } from 'src/app/employee/services/simple.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { setHours } from 'date-fns';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap, filter, map } from 'rxjs/operators';
import { UploadFile } from 'ng-zorro-antd/upload';
import { HttpResponse } from '@angular/common/http';
import { MyResponse } from 'src/app/share/response';

@Component({
  selector: 'app-application-add',
  templateUrl: './application-add.component.html',
  styleUrls: ['./application-add.component.less'],
})
export class ApplicationAddComponent implements OnInit {
  @Input() category: number;
  @Input() template: number;
  @Output() submited = new EventEmitter<any>();
  requestForm = this.fb.group({});

  fileList: UploadFile[] = [];

  timeDefaultValue = setHours(new Date(), 0);

  current = 0;

  categorys$: Observable<Category[]>;

  selectedCategory$ = new BehaviorSubject<Category>(null);

  selectedCategoryName$ = new BehaviorSubject<string>('タイプを選択');

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = [];
    this.fileList = this.fileList.concat(file);
    return false;
  };

  disabledDate = (current: Date): boolean => {
    const today = new Date();
    return differenceInCalendarDays(current, today) < 0;
  };

  selectType(i: number) {
    this.reset();

    this.simple
      .getCategory()
      .pipe(
        tap((cates) => {
          const selected = cates.find((cate) => {
            return cate.Id === i;
          });
          this.selectedCategory$.next(selected);
          this.selectedCategoryName$.next(selected.Name);
          this.renderForm(selected.Template);
          this.current += 1;
        }),
      )
      .subscribe((_) => {});
  }

  renderForm(fields: any) {
    this.requestForm = this.fb.group({});
    fields.forEach((field) => {
      const defalutValue = ['day', 'month'].includes(field.type) ? new Date() : '';
      const validators = ['file'].includes(field.type) ? [] : [Validators.required];
      this.requestForm.addControl(field.name, new FormControl(defalutValue, validators));
    });
  }

  step(value: number): void {
    this.current += value;
    if (this.current === 0) {
      this.reset();
    }
  }

  done(): void {
    this.submit();
  }

  handleUpload(): Observable<void> {
    return new Observable((observer) => {
      const formData = new FormData();
      if (!this.fileList.length || !(this.fileList[0] instanceof File)) {
        this.requestForm.patchValue({
          Files: [],
        });
        observer.next();
      } else {
        this.fileList.forEach((file: any) => {
          formData.append('files[]', file);
        });
        this.simple.upload(formData).subscribe((res) => {
          if (res instanceof HttpResponse) {
            const myResponse = res.body as MyResponse;
            this.requestForm.patchValue({
              Files: myResponse.data.fileIds,
            });
            observer.next();
          }
        });
      }
    });
  }

  submit() {
    for (const i in this.requestForm.controls) {
      if (this.requestForm.controls.hasOwnProperty(i)) {
        this.requestForm.controls[i].markAsDirty();
        this.requestForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.requestForm.valid) {
      this.handleUpload().subscribe((_) => {
        const data = this.requestForm.value;
        this.selectedCategory$.subscribe((cate: Category) => {
          data.applicationCategory = cate.Id;
          this.simple.addApplication(data).subscribe((res) => {
            if (res.code === 0) {
              if (this.category && this.template) {
                console.log(this.submited.emit(true));
              } else {
                this.message.success('完成');
                this.router.navigate(['/employee/application']);
              }
            } else {
              this.message.warning(res.msg);
            }
          });
        });
      });
    }
  }

  reset() {
    this.current = 0;
    this.requestForm.reset();
  }

  constructor(
    private simple: SimpleService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
  ) {}

  ngOnInit(): void {
    if (this.category && this.template) {
      this.categorys$ = this.simple.getCategory().pipe(
        filter((cates) => cates !== null),
        map((cates) => {
          return cates.filter((cate) => {
            return cate.Type === this.category;
          });
        }),
      );
      this.selectType(this.template);
    } else {
      this.categorys$ = this.route.queryParamMap.pipe(
        switchMap((params) => {
          return this.simple.getCategory().pipe(
            filter((cates) => cates !== null),
            map((cates) => {
              return cates.filter((cate) => {
                return cate.Type.toString() === params.get('category');
              });
            }),
          );
        }),
      );
      this.categorys$.pipe(filter((res) => res != null)).subscribe((_) => {
        this.reset();
      });

      this.route.queryParamMap.pipe(filter((params) => params.has('template'))).subscribe((params) => {
        this.selectType(parseInt(params.get('template'), 10));
      });
    }
  }
}
