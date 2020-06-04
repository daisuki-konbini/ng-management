import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-schedule-list',
  templateUrl: './work-schedule-list.component.html',
  styleUrls: ['./work-schedule-list.component.less'],
})
export class WorkScheduleListComponent implements OnInit {
  dataSet = [
    {
      month: '7',
      lastEditTime: '2020/05/02 22:00:00',
      status: 'New York No. 1 Lake Park',
    },
    {
      month: '6',
      lastEditTime: '2020/05/02 22:00:00',
      status: 'London No. 1 Lake Park',
    },
    {
      month: '5',
      lastEditTime: '2020/05/02 22:00:00',
      status: 'Sidney No. 1 Lake Park',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
