import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from '../models/account.model';
import { AccountStatistics } from '../models/account-statistics.model';
import { MessageService } from '../../modules/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'api/account';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.baseUrl}/accounts`, account)
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      );
  }

  getAccount(username: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/accounts/${username}`)
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      );
  }

  saveAccount(username: string, account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}/accounts/${username}`, account)
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      );
  }

  deleteAccount(username: string): Observable<Account> {
    return this.http.delete<Account>(`${this.baseUrl}/accounts/${username}`)
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      );
  }

  getAccounts(usernamePart: string): Observable<Account[]> {
    const params = usernamePart ? new HttpParams().set('usernamePart', usernamePart) : new HttpParams();

    return this.http.get<Account[]>(`${this.baseUrl}/accounts`, {params})
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      );
  }

  getAccountStatistics(username: string): Observable<AccountStatistics> {
    return this.http.get<AccountStatistics>(`${this.baseUrl}/statistics/${username}`)
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      )
  }
}
