import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [httpInterceptorProviders],
})
export class CoreModule {}
