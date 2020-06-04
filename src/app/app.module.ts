import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ShareModule, EmployeeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
