import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Account } from "../models/account.model";
import { MessageService } from "../components/message/message.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'api/account/';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  register(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl + 'accounts', account)
      .pipe(
        catchError((response: Response) => {
          return throwError(this.messageService.getMessageText(response));
        })
      );
  }

  loadProfile(): Observable<Account> {
    return this.http.get<Account>(this.baseUrl + 'profile').pipe(
      catchError((response: Response) => {
        return throwError(this.messageService.getMessageText(response));
      })
    );
  }

  saveProfile(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl + 'profile', account)
      .pipe(
        catchError((response: Response) => {
          return throwError(this.messageService.getMessageText(response));
        })
      );
  }
}
