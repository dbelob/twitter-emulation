import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, map } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable()
export class AuthenticationService {
  baseUrl = '/api/';
  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, success?: () => void, error?: () => void): Observable<boolean> {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    return this.http.get(this.baseUrl + 'user', {headers: headers}).pipe(
      map(response => {
          if (response['name']) {
            this.authenticated = true;
            if (success) {
              success();
            }
            return true;
          } else {
            this.authenticated = false;
            if (error) {
              error();
            }
            return false;
          }
        }
      ),
      catchError(err => {
        this.authenticated = false;
        if (error) {
          error();
        }
        return of(false)
      })
    );
  }

  logout(callback?: () => void) {
    this.http.post('logout', {}).pipe(
      finalize(() => {
        this.authenticated = false;
        if (callback) {
          callback();
        }
      })
    ).subscribe();
  }
}
