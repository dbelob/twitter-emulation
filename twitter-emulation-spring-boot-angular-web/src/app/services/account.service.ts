import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Account } from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'api/account/';

  constructor(private http: HttpClient) {
  }

  register(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl + 'register', account)
      .pipe(
        catchError((response: Response) => {
          // console.log(JSON.stringify(response));

          let error = response['error'];
          if (error) {
            // console.log(JSON.stringify(error));

            let trace = error['trace'];
            // console.log(JSON.stringify(trace));

            if (trace.indexOf('AccountExistsException') != -1) {
              return throwError(`Account with the same name already exists`);
            }
          }

          return throwError(`Network Error: ${response.statusText} (${response.status})`);
        })
      );
  }
}
