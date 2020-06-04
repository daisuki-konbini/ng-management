import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPageComponent } from './default-page/default-page.component';
import { ShareModule } from '../share/share.module';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { LoginComponent } from './login/login.component';
import { SubPageComponent } from './sub-page/sub-page.component';

const COMPONENTS = [DefaultPageComponent, SubMenuComponent, SubPageComponent];

@NgModule({
  declarations: [...COMPONENTS, LoginComponent],
  imports: [CommonModule, ShareModule],
  exports: [...COMPONENTS],
})
export class LayoutModule {}
