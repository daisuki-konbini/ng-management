import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyResponse } from 'src/app/share/response';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, switchMap, concatMap, filter, switchMapTo } from 'rxjs/operators';

export enum Status {
  Undone = 0,
  Done,
}

export interface User {
  Id: number;
  Status: Status;
  UserProfile: Profile;
}

export interface Profile {
  LastName: string;
  FirstName: string;
  LastNameKana: string;
  FirstNameKana: string;
  Sex: number;
  BirthDay: Date;
  Address: string;
  PhoneNumber: string;
  EmailAddress: string;
  JoinDate: Date;
  Residence: string;
  ResidenceDeadline: Date;
  MyNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  profile: Profile = null;

  constructor(private http: HttpClient) {
    this.initUser();
  }

  initUser() {
    this.getUserFromApi().subscribe((user) => {
      this.user$.next(user);
    });
  }

  getUser(): Observable<User> {
    return this.user$.asObservable().pipe(
      switchMap((user) => {
        if (user === null) {
          return this.getUserFromApi();
        } else {
          return of(user);
        }
      }),
    );
  }

  updateUser(info: Profile): Observable<MyResponse> {
    return this.updateUserFromApi(info).pipe(
      switchMap((res) => {
        if (res.code === 0) {
          this.getUserFromApi().subscribe((user) => {
            this.user$.next(user);
            of(res);
          });
        }
        return of(res);
      }),
    );
  }

  private getUserFromApi(): Observable<User> {
    return this.http.get<MyResponse>(`${environment.baseUrl}/employee/user`).pipe(
      filter((res) => res.code === 0),
      map((res) => res.data),
    );
  }

  private updateUserFromApi(profile: Profile): Observable<MyResponse> {
    return this.http.put<MyResponse>(`${environment.baseUrl}/employee/user`, profile);
  }
}
