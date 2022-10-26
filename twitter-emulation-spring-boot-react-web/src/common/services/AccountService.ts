import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { Axios, AxiosObservable } from 'axios-observable';
import { inject, injectable } from 'inversify';
import { Account } from '../models/Account';
import { AccountStatistics } from '../models/AccountStatistics';
import { MessageService } from '../../message/MessageService';

@injectable()
export class AccountService {
    private readonly baseUrl = '/api/account';

    @inject(MessageService)
    private readonly messageService!: MessageService;

    addAccount(account: Account): AxiosObservable<Account> {
        return Axios.post(`${this.baseUrl}/accounts`, account)
            .pipe(
                catchError((err: AxiosError) => {
                    this.messageService.reportMessage(err.response);
                    throw err;
                })
            );
    }

    getAccounts(usernamePart: string): Observable<Account[]> {
        // TODO: implement
        return of([]);
    }

    getAccountStatistics(username: string): Observable<AccountStatistics> {
        return Axios.get(`${this.baseUrl}/statistics/${username}`)
            .pipe(
                map(response => response.data),
                catchError((err: AxiosError) => {
                    this.messageService.reportMessage(err.response);
                    throw err;
                })
            );
    }
}
