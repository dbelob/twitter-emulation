import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Account } from "../models/account.model";
import { MessageService } from "../components/message/message.service";
import { AccountStatistics } from "../models/account-statistics.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'api/account/';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl + 'accounts', account)
      .pipe(
        catchError((response: Response) => {
          return throwError(this.messageService.getMessageText(response));
        })
      );
  }

  getAccount(username: string): Observable<Account> {
    return this.http.get<Account>(this.baseUrl + `accounts/${username}`).pipe(
      catchError((response: Response) => {
        return throwError(this.messageService.getMessageText(response));
      })
    );
  }

  saveAccount(username: string, account: Account): Observable<Account> {
    return this.http.put<Account>(this.baseUrl + `accounts/${username}`, account)
      .pipe(
        catchError((response: Response) => {
          return throwError(this.messageService.getMessageText(response));
        })
      );
  }

  deleteAccount(username: string): Observable<Account> {
    return this.http.delete<Account>(this.baseUrl + `accounts/${username}`)
      .pipe(
        catchError((response: Response) => {
          return throwError(this.messageService.getMessageText(response));
        })
      );
  }

  getAccountStatistics(username: string): Observable<AccountStatistics> {
    return this.http.get(this.baseUrl + `statistics/${username}`)
      .pipe(
        catchError((response: Response) => {
          return throwError(this.messageService.getMessageText(response));
        })
      )
  }
}
