import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyResponse } from 'src/app/share/response';
import { filter, map, switchMap } from 'rxjs/operators';

export enum ApplicationCategory {
  Depend = 0,
  Assets,
  Reimburse,
}

export interface Field {
  name: string;
  label: string;
  type: string;
}

export enum IRStatus {
  StatusCreated = 0,
  StatusAccept,
  StatusRefused,
  StatusFinished,
}

export const IRStausDisplay = {};
IRStausDisplay[IRStatus.StatusCreated] = 'created';
IRStausDisplay[IRStatus.StatusAccept] = 'accept';
IRStausDisplay[IRStatus.StatusRefused] = 'refused';
IRStausDisplay[IRStatus.StatusFinished] = 'finished';

export interface Category {
  Id: number;
  Name: string;
  Type: number;
  Template: string;
}

export interface Document {
  Id: number;
  Files: string;
  Intro: string;
}

export interface Application {
  ApplicationCategory: Category;
  Deadline: Date;
  Record: string;
  Status: number;
  StatusName: string;
}

@Injectable({
  providedIn: 'root',
})
export class SimpleService {
  // private document$ = new BehaviorSubject<any>

  private category$ = new BehaviorSubject<any>(null);

  private documents$ = new BehaviorSubject<Document[]>(null);

  private application$ = new BehaviorSubject<Application[]>(null);

  constructor(private http: HttpClient) {
    this.getCategoryFromApi().subscribe((res) => {
      const cates = res.data;
      cates.map((cate: Category) => {
        cate.Template = JSON.parse(cate.Template);
      });
      this.category$.next(cates);
    });

    this.getDocumentFromApi().subscribe((res) => {
      const docs = res.data;
      docs.map((doc: Document) => {
        doc.Files = JSON.parse(doc.Files);
      });
      this.documents$.next(docs);
    });

    this.initApplication();
  }

  initApplication() {
    this.getApplicationFromApi()
      .pipe(filter((res) => res !== null))
      .subscribe((res) => {
        const apps = res.data;
        if (apps) {
          apps.map((app: Application) => {
            app.Deadline = new Date(app.Deadline);
            if (typeof app.Record === 'string' && app.Record !== '') {
              app.Record = JSON.parse(app.Record);
              app.ApplicationCategory.Template = JSON.parse(app.ApplicationCategory.Template);
            }
          });
        }
        this.application$.next(apps);
      });
  }

  getDocument(id: number = 1): Observable<Document> {
    return this.documents$.asObservable().pipe(
      filter((docs) => docs !== null),
      map((docs) => {
        return docs.filter((doc) => doc.Id === id)[0];
      }),
    );
  }

  delApplication(id: number): Observable<MyResponse> {
    return this.http.delete<MyResponse>(`${environment.baseUrl}/employee/application/` + id).pipe(
      switchMap((res) => {
        this.initApplication();
        return of(res);
      }),
    );
  }

  getApplication(): Observable<Application[]> {
    return this.application$.asObservable().pipe(filter((apps) => apps !== null));
  }

  getDocumentFromApi(): Observable<MyResponse> {
    return this.http.get<MyResponse>(`${environment.baseUrl}/employee/document`);
  }

  getCategory(): Observable<Category[]> {
    return this.category$.asObservable().pipe(filter((cates) => cates !== null));
  }

  getCategoryFromApi(): Observable<MyResponse> {
    return this.http.get<MyResponse>(`${environment.baseUrl}/employee/application/category`);
  }

  addApplication(data: any): Observable<MyResponse> {
    return this.http.post<MyResponse>(`${environment.baseUrl}/employee/application`, data).pipe(
      switchMap((res) => {
        this.initApplication();
        return of(res);
      }),
    );
  }

  getApplicationFromApi(): Observable<MyResponse> {
    return this.http.get<MyResponse>(`${environment.baseUrl}/employee/application`);
  }

  addWorkSchedule(data: any): Observable<MyResponse> {
    return this.http.post<MyResponse>(`${environment.baseUrl}/employee/work-schedule`, data);
  }

  getWorkSchedule(): Observable<MyResponse> {
    return this.http.get<MyResponse>(`${environment.baseUrl}/employee/work-schedule`);
  }

  putWorkSchedule(id: number, data: any): Observable<MyResponse> {
    return this.http.put<MyResponse>(`${environment.baseUrl}/employee/work-schedule/` + id, data);
  }

  upload(formData: FormData) {
    const req = new HttpRequest('POST', `${environment.baseUrl}/file`, formData, {
      reportProgress: true,
    });
    return this.http.request(req).pipe(filter((e) => e instanceof HttpResponse));
  }
}
