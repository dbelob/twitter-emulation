import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {finalize} from "rxjs/operators";

@Injectable()
export class AppService {
  baseUrl = '/api/';
  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {
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
      return callback && callback();
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
