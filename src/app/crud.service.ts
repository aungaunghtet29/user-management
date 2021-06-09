import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from './model/user';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  endPoint = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(this.endPoint + '/users/' + id)
      .pipe(retry(1), catchError(this.httpError));
  }

  getAllUser(): Observable<User> {
    return this.http
      .get<User>(this.endPoint + '/users')
      .pipe(retry(1), catchError(this.httpError));
  }

  create(user: User): Observable<User> {
    return this.http
      .post<User>(this.endPoint + '/users', JSON.stringify(user) , this.httpHeader)
      .pipe( catchError(this.httpError));
  }

  delete(id: number): Observable<User> {
    return this.http
      .delete<User>(this.endPoint + '/users/' + id, this.httpHeader)
      .pipe(retry(1), catchError(this.httpError));
  }

  update(id: number, value: User): Observable<User> {
    return this.http
      .patch<User>(
        this.endPoint + '/users/' + id,
        JSON.stringify(value),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.httpError));
  }

  httpError(error: any) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code ${error.status}\nMessage : ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
