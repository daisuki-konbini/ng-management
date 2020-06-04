import { NgModule } from '@angular/core';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ShareModule } from '../share/share.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentComponent } from './components/document/document.component';
import { PaidComponent } from './components/paid/paid.component';
import { LayoutModule } from '../layout/layout.module';
import { WorkScheduleListComponent } from './components/work-schedule/work-schedule-list/work-schedule-list.component';
import { WorkScheduleWriteComponent } from './components/work-schedule/work-schedule-write/work-schedule-write.component';
import {
  AccountPersonalInfoComponent,
  AccountSecurityComponent,
  AccountBaseComponent,
  AccountAddressComponent,
} from './components/account';
import { ApplicationListComponent, ApplicationAddComponent } from './components/application';

@NgModule({
  declarations: [
    DashboardComponent,
    DocumentComponent,
    PaidComponent,
    WorkScheduleListComponent,
    WorkScheduleWriteComponent,
    AccountPersonalInfoComponent,
    AccountSecurityComponent,
    AccountBaseComponent,
    AccountAddressComponent,
    ApplicationListComponent,
    ApplicationAddComponent,
  ],
  imports: [ShareModule, EmployeeRoutingModule, LayoutModule],
})
export class EmployeeModule {}
