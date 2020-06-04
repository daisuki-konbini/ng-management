import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyResponse } from 'src/app/share/response';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/employee/services/user.service';

export interface User {
  accountName: string;
  token: string;
}

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  set user(user: User) {
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  get user(): User {
    return JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY));
  }

  logout() {
    return sessionStorage.removeItem(USER_STORAGE_KEY);
  }

  login(account: string, passwd: string): Observable<MyResponse> {
    return this.http
      .post<MyResponse>(`${environment.baseUrl}/login`, { accountName: account, password: passwd })
      .pipe(
        map((res: MyResponse) => {
          this.user = { accountName: account, token: res.data.token };
          return res;
        }),
      );
  }

  getAuthorizationToken(): string {
    if (!this.user) {
      return '';
    }
    return this.user.token;
  }

  getUserInfo(): Observable<MyResponse> {
    return;
  }
}
