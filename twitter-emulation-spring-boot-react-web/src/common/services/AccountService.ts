import { catchError, Observable } from 'rxjs';
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
                    this.messageService.reportMessage(err);
                    throw err;
                })
            );
    }

    getAccount(username: string): Observable<Account> {
        return Axios.get(`${this.baseUrl}/accounts/${username}`)
            .pipe(
                map(response => response.data),
                catchError((err: AxiosError) => {
                    this.messageService.reportMessage(err);
                    throw err;
                })
            );
    }

    saveAccount(username: string, account: Account): AxiosObservable<Account> {
        return Axios.put(`${this.baseUrl}/accounts/${username}`, account)
            .pipe(
                catchError((err: AxiosError) => {
                    this.messageService.reportMessage(err);
                    throw err;
                })
            );
    }

    deleteAccount(username: string): AxiosObservable<Account> {
        return Axios.delete<Account>(`${this.baseUrl}/accounts/${username}`)
            .pipe(
                catchError((err: AxiosError) => {
                    this.messageService.reportMessage(err);
                    throw err;
                })
            );
    }

    getAccounts(usernamePart: string | null | undefined): Observable<Account[]> {
        const config = usernamePart ? {
            params: {
                'usernamePart': usernamePart
            }
        } : {};

        return Axios.get<Account[]>(`${this.baseUrl}/accounts`, config)
            .pipe(
                map(response => response.data),
                catchError((err: AxiosError) => {
                    this.messageService.reportMessage(err);
                    throw err;
                })
            );
    }

    getAccountStatistics(username: string): Observable<AccountStatistics> {
        return Axios.get(`${this.baseUrl}/statistics/${username}`)
            .pipe(
                map(response => response.data),
                catchError((err: AxiosError) => {
                    this.messageService.reportMessage(err);
                    throw err;
                })
            );
    }
}
