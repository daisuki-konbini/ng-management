import { Component, OnInit } from '@angular/core';
import { IRStatus, SimpleService, Application } from 'src/app/employee/services/simple.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter, map, switchMapTo, tap, switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { formatDistance, formatRelative, add, format, formatDistanceStrict } from 'date-fns';
import { ja } from 'date-fns/locale';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.less'],
})
export class ApplicationListComponent implements OnInit {
  date = new Date();

  status = IRStatus;

  showDates$: Observable<Set<string>>;

  showDatas$: Observable<Map<string, Application[]>>;

  date$: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  onValueChange(date: Date): void {
    this.date$.next(date);
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(id: number): void {
    this.simple.delApplication(id).subscribe((res) => {
      this.nzMessageService.info('click confirm');
    });
  }

  formatDeadline(date: Date) {
    return formatDistance(date, new Date(), {
      addSuffix: true,
      locale: ja,
    });
  }

  formatDate(value: string) {
    return formatDistanceStrict(add(new Date(value), { days: 1 }), new Date(), {
      locale: ja,
    });
  }

  constructor(private simple: SimpleService, private nzMessageService: NzMessageService) {}

  ngOnInit(): void {
    this.showDates$ = this.simple.getApplication().pipe(
      map((apps) => {
        const dates = new Set<string>();
        apps.forEach((app) => dates.add(app.Deadline.toLocaleDateString()));
        return dates;
      }),
    );

    this.showDatas$ = this.date$.pipe(
      switchMap((d) => {
        return this.showDates$.pipe(
          map((dates) => {
            const _dates: string[] = [];
            dates.forEach((date) => {
              if (date >= d.toLocaleDateString() && _dates.length < 2) {
                _dates.push(date);
              }
            });
            return _dates;
          }),
        );
      }),
      switchMap((dates) => {
        return this.simple.getApplication().pipe(
          map((apps) => {
            const list = new Map();
            apps.forEach((app) => {
              const deadline = app.Deadline.toLocaleDateString();
              if (dates.includes(deadline)) {
                if (list.has(deadline)) {
                  const _d = list.get(deadline).concat(app);
                  list.set(deadline, _d);
                } else {
                  list.set(deadline, [app]);
                }
              }
            });
            return list;
          }),
        );
      }),
    );
  }
}
