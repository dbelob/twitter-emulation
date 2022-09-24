import { AxiosError } from 'axios';
import { Axios, AxiosObservable } from 'axios-observable';
import { catchError } from 'rxjs';
import { inject, injectable } from 'inversify';
import { AccountStatistics } from '../models/AccountStatistics';
import { MessageService } from '../MessageService';

@injectable()
export class AccountDataSource {
    private readonly baseUrl = '/api/account';

    @inject(MessageService)
    private readonly messageService!: MessageService;

    getAccountStatistics(username: string): AxiosObservable<AccountStatistics> {
        return Axios.get(`${this.baseUrl}/statistics/${username}`)
            .pipe(
                catchError((err: AxiosError) => {
                    this.messageService.reportMessage(err.response);
                    throw err;
                })
            );
    }
}
