import axios, { AxiosError, AxiosResponse } from 'axios';
import { inject, injectable } from 'inversify';
import { Account } from '../models/Account';
import { AccountStatistics } from '../models/AccountStatistics';
import { MessageService } from '../../message/MessageService';

@injectable()
export class AccountService {
    private readonly baseUrl = '/api/account';

    @inject(MessageService)
    private readonly messageService!: MessageService;

    addAccount(account: Account, thenCallback: () => void) {
        axios.post(`${this.baseUrl}/accounts`, account)
            .then(response => {
                thenCallback();
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    getAccount(username: string, thenCallback: (response: AxiosResponse<Account>) => void) {
        return axios.get(`${this.baseUrl}/accounts/${username}`)
            .then(response => {
                thenCallback(response);
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    saveAccount(username: string, account: Account, thenCallback: () => void) {
        axios.put(`${this.baseUrl}/accounts/${username}`, account)
            .then(response => {
                thenCallback();
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    deleteAccount(username: string, thenCallback: () => void) {
        axios.delete<Account>(`${this.baseUrl}/accounts/${username}`)
            .then(response => {
                thenCallback();
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    getAccounts(usernamePart: string | null | undefined, thenCallback: (response: AxiosResponse<Account[]>) => void) {
        const config = usernamePart ? {
            params: {
                'usernamePart': usernamePart
            }
        } : {};

        axios.get<Account[]>(`${this.baseUrl}/accounts`, config)
            .then(response => {
                thenCallback(response);
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    getAccountStatistics(username: string, thenCallback: (response: AxiosResponse<AccountStatistics>) => void) {
        axios.get(`${this.baseUrl}/statistics/${username}`)
            .then(response => {
                thenCallback(response);
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }
}
