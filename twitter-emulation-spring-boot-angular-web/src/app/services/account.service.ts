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
        catchError((error: Response) =>
          throwError(`Network Error: ${error.statusText} (${error.status})`))
      )
      ;
  }
}
