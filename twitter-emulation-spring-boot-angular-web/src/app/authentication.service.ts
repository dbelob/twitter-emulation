import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from "rxjs/operators";

@Injectable()
export class AuthenticationService {
  baseUrl = '/api/';
  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, next, error, complete) {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get(this.baseUrl + 'user', {headers: headers}
    ).subscribe(response => {
        if (response['name']) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
        return next && next();
      },
      () => {
        return error && error();
      },
      () => {
        return complete && complete();
      });
  }

  logout(callback) {
    this.http.post('logout', {}).pipe(
      finalize(() => {
        this.authenticated = false;
        return callback && callback();
      })
    ).subscribe();
  }
}
