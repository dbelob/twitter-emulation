import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { Axios } from 'axios-observable';
import { inject, injectable } from 'inversify';
import { Account } from '../models/Account';
import { AccountStatistics } from '../models/AccountStatistics';
import { MessageService } from '../MessageService';

@injectable()
export class AccountDataSource {
    private readonly baseUrl = '/api/account';

    @inject(MessageService)
    private readonly messageService!: MessageService;

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
