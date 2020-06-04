import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { httpInterceptorProviders } from './core/interceptors';
import { LoginComponent } from './layout/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/employee/dashboard', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [httpInterceptorProviders],
})
export class AppRoutingModule {}
