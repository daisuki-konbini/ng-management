import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SimpleService } from 'src/app/employee/services/simple.service';
import { HttpResponse } from '@angular/common/http';
import { MyResponse } from 'src/app/share/response';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-schedule-write',
  templateUrl: './work-schedule-write.component.html',
  styleUrls: ['./work-schedule-write.component.less'],
})
export class WorkScheduleWriteComponent implements OnInit {
  loading = false;

  step = 0;

  isVisible = false;

  isUploadDone = new Subject<boolean>();

  isFillTicket = false;

  ammount = 0;

  commuterPass = null;

  originFormValue = null;

  id = 0;

  fileIds$ = new Observable<number[]>();

  workScheduleForm = this.fb.group({
    hours: ['', Validators.required],
    remark: [''],
    fileIds: [''],
  });

  fileList: UploadFile[] = [];

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = [];
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): Observable<void> {
    const formData = new FormData();
    return Observable.create((observer) => {
      if (!this.fileList.length || !(this.fileList[0] instanceof File)) {
        observer.next();
      } else {
        this.fileList.forEach((file: any) => {
          formData.append('files[]', file);
        });
        this.simple.upload(formData).subscribe((res) => {
          if (res instanceof HttpResponse) {
            const myResponse = res.body as MyResponse;
            this.workScheduleForm.patchValue({
              fileIds: myResponse.data.fileIds,
            });
            observer.next();
          }
        });
      }
    });
  }

  validateForm() {
    for (const i in this.workScheduleForm.controls) {
      if (this.workScheduleForm.controls.hasOwnProperty(i)) {
        this.workScheduleForm.controls[i].markAsDirty();
        this.workScheduleForm.controls[i].updateValueAndValidity();
      }
    }
  }

  submit() {
    // todo
    this.validateForm();
    if (this.workScheduleForm.valid) {
      this.loading = true;
      this.handleUpload().subscribe((res) => {
        this.simple.addWorkSchedule(this.workScheduleForm.value).subscribe((res) => {
          this.loading = false;
          this.init();
        });
      });
    }
  }

  update() {
    this.validateForm();
    if (
      this.workScheduleForm.valid &&
      JSON.stringify(this.workScheduleForm.value) !== JSON.stringify(this.originFormValue)
    ) {
      this.loading = true;
      this.handleUpload().subscribe((res) => {
        this.simple.putWorkSchedule(this.id, this.workScheduleForm.value).subscribe((res) => {
          this.loading = false;
          this.init();
        });
      });
    }
  }

  getFileName(name: string): string {
    return name.split('***')[1];
  }
  constructor(
    private fb: FormBuilder,
    private simple: SimpleService,
    private msg: NzMessageService,
    private router: Router,
  ) {}

  init() {
    this.simple.getWorkSchedule().subscribe((res) => {
      const commuterPass = res.data.commuterPass;
      if (commuterPass) {
        this.isFillTicket = true;
        commuterPass.Record = JSON.parse(commuterPass.Record);
        this.commuterPass = commuterPass;
      }

      const workSchedule = res.data.workSchedule;
      if (workSchedule) {
        if (workSchedule.Status === 0) {
          this.step = 1;
        } else if (workSchedule.Status === 1) {
          this.step = 2;
        }
        this.workScheduleForm.patchValue({
          hours: workSchedule.Hours,
          remark: workSchedule.Remark,
        });
        this.id = workSchedule.Id;
        if (workSchedule.FileList) {
          const fileIds = [];
          workSchedule.FileList.forEach((file) => {
            const tmp: UploadFile = {
              uid: file.Id.toString(),
              name: this.getFileName(file.Url),
              url: file.Url,
            };
            fileIds.push(file.Id);
            this.fileList = this.fileList.concat(tmp);
          });
          this.workScheduleForm.patchValue({
            fileIds: fileIds,
          });
        }
      }
      this.originFormValue = this.workScheduleForm.value;
    });
  }

  ngOnInit(): void {
    this.init();
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleSubmit(event: any) {
    this.handleCancel();
    this.init();
  }

  delAmmuterPass() {
    this.simple.delApplication(this.commuterPass.Id).subscribe((res) => {
      this.msg.info('cancel success');
      this.commuterPass = null;
    });
  }
}
