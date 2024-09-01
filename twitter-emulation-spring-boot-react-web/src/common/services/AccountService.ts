import axios, { AxiosError } from 'axios';
import { inject, injectable } from 'inversify';
import { Account } from '../models/Account';
import { AccountStatistics } from '../models/AccountStatistics';
import { MessageService } from '../../message/MessageService';

@injectable()
export class AccountService {
    private readonly baseUrl = '/api/account';

    @inject(MessageService)
    private readonly messageService!: MessageService;

    addAccount(account: Account) {
        return axios.post(`${this.baseUrl}/accounts`, account)
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    getAccount(username: string) {
        return axios.get<Account>(`${this.baseUrl}/accounts/${username}`)
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    saveAccount(username: string, account: Account) {
        return axios.put(`${this.baseUrl}/accounts/${username}`, account)
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    deleteAccount(username: string) {
        return axios.delete<Account>(`${this.baseUrl}/accounts/${username}`)
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    getAccounts(usernamePart: string | null | undefined) {
        const config = usernamePart ? {
            params: {
                'usernamePart': usernamePart
            }
        } : {};

        return axios.get<Account[]>(`${this.baseUrl}/accounts`, config)
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    getAccountStatistics(username: string) {
        return axios.get<AccountStatistics>(`${this.baseUrl}/statistics/${username}`)
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }
}
