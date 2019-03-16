import { Account } from "./account";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'api/account/';

  constructor(private http: HttpClient) {
  }

  register(account: Account, success?: () => void, error?: () => void) {
    this.http.post<Account>(this.baseUrl + 'register', account).pipe(
      map(response => {
          if (success) {
            success();
          }
        }
      ),
      catchError(err => {
        if (error) {
          error();
        }
        return of(false)
      })
    );
  }
}
