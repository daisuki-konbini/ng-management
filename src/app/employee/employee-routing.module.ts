import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentComponent } from './components/document/document.component';
import { PaidComponent } from './components/paid/paid.component';
import { DefaultPageComponent } from '../layout/default-page/default-page.component';
import { WorkScheduleWriteComponent } from './components/work-schedule/work-schedule-write/work-schedule-write.component';
import {
  AccountBaseComponent,
  AccountPersonalInfoComponent,
  AccountSecurityComponent,
  AccountAddressComponent,
} from './components/account';
import { ApplicationListComponent, ApplicationAddComponent } from './components/application';
import { SubPageComponent } from '../layout/sub-page/sub-page.component';
import { ApplicationCategory } from './services/simple.service';

const routes: Routes = [
  {
    path: 'employee',
    component: DefaultPageComponent,
    data: {
      breadcrumb: 'ダッシュボード',
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'work-shedule',
        component: SubPageComponent,
        data: {
          breadcrumb: '勤務表登録',
        },
        children: [
          // {
          //   path: '',
          //   component: WorkScheduleListComponent,
          //   data: {
          //     breadcrumb: '勤務表履歴',
          //   },
          // },
          {
            path: '',
            component: WorkScheduleWriteComponent,
            data: {
              title: '勤務表登録',
              iconType: 'form',
              breadcrumb: '勤務表登録',
            },
          },
        ],
      },
      {
        path: 'document',
        component: SubPageComponent,
        data: {
          breadcrumb: '重要書類一覧',
        },
        children: [
          {
            path: '',
            component: DocumentComponent,
            data: {
              title: '年末調整',
              iconType: 'file-word',
            },
          },
          {
            path: '2',
            component: DocumentComponent,
            data: {
              params: {
                id: 2,
              },
              title: 'ビザ更新',
              iconType: 'file-word',
            },
          },
          {
            path: '3',
            component: DocumentComponent,
            data: {
              params: {
                id: 3,
              },
              title: '在職資料',
              iconType: 'file-word',
            },
          },
          {
            path: '4',
            component: DocumentComponent,
            data: {
              params: {
                id: 4,
              },
              title: '勤務書',
              iconType: 'file-word',
            },
          },
        ],
      },
      {
        path: 'paid',
        component: PaidComponent,
        data: {
          breadcrumb: '給料詳細',
        },
      },
      {
        path: 'application',
        component: SubPageComponent,
        data: {
          breadcrumb: '',
        },
        children: [
          {
            path: '',
            component: ApplicationListComponent,
            data: {
              breadcrumb: '日程',
              title: '日程',
            },
          },
          {
            path: 'depend',
            component: ApplicationAddComponent,
            data: {
              params: {
                category: ApplicationCategory.Depend,
              },
              breadcrumb: '依頼事項',
              title: '依頼事項',
              iconType: 'send',
            },
          },
          {
            path: 'assets',
            component: ApplicationAddComponent,
            data: {
              params: {
                category: ApplicationCategory.Assets,
              },
              breadcrumb: 'リース資産',
              title: 'リース資産',
              iconType: 'dollar',
            },
          },
          {
            path: 'reimburse',
            component: ApplicationAddComponent,
            data: {
              params: {
                category: ApplicationCategory.Reimburse,
              },
              breadcrumb: '报销',
              title: '报销',
              iconType: 'dollar',
            },
          },
        ],
      },
      {
        path: 'account',
        component: AccountBaseComponent,
        data: {
          breadcrumb: '',
        },
        children: [
          {
            path: '',
            component: AccountPersonalInfoComponent,
            data: {
              breadcrumb: '社員詳細',
            },
          },
          {
            path: 'security',
            component: AccountSecurityComponent,
            data: {
              breadcrumb: '安全设置',
            },
          },
          {
            path: 'address',
            component: AccountAddressComponent,
            data: {
              breadcrumb: '地址设置',
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
