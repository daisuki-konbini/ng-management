import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private route: Router, private msg: NzMessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.auth.getAuthorizationToken();
    const authReq = request.clone({
      headers: request.headers.set('Authorization', authToken),
    });

    return next.handle(authReq).pipe(
      tap(
        (_) => {},
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.msg.error('请重新登录');
              this.route.navigateByUrl('/login');
            }
          }
        },
      ),
    );
  }
}
