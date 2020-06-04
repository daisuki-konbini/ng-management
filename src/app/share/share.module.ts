import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//  ant component
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { registerLocaleData } from '@angular/common';
import ja from '@angular/common/locales/ja';
registerLocaleData(ja);

import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NZ_I18N, ja_JP } from 'ng-zorro-antd/i18n';
import { NzModalModule } from 'ng-zorro-antd/modal';

const COMPONENTS = [
  CommonModule,
  NzMenuModule,
  NzLayoutModule,
  NzBreadCrumbModule,
  NzDropDownModule,
  NzIconModule,
  HttpClientModule,
  BrowserAnimationsModule,
  NzListModule,
  NzGridModule,
  NzCardModule,
  NzBadgeModule,
  NzFormModule,
  NzInputModule,
  ReactiveFormsModule,
  FormsModule,
  NzUploadModule,
  NzButtonModule,
  NzTreeModule,
  NzTableModule,
  NzDividerModule,
  NzCalendarModule,
  NzPageHeaderModule,
  RouterModule,
  NzStatisticModule,
  NzDescriptionsModule,
  NzStepsModule,
  NzTabsModule,
  NzSelectModule,
  NzInputNumberModule,
  NzRadioModule,
  NzDatePickerModule,
  NzTimelineModule,
  NzTagModule,
  NzMessageModule,
  NzAlertModule,
  NzPopconfirmModule,
  NzModalModule,
];

@NgModule({
  declarations: [],
  imports: [...COMPONENTS],
  exports: [...COMPONENTS],
  providers: [{ provide: NZ_I18N, useValue: ja_JP }],
})
export class ShareModule {}
