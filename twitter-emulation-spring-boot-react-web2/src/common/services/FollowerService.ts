import axios, { AxiosError, AxiosResponse } from 'axios';
import { inject, injectable } from 'inversify';
import { Account } from '../models/Account';
import { MessageService } from '../../message/MessageService';

@injectable()
export class FollowerService {
    private readonly baseUrl = '/api/follower';

    @inject(MessageService)
    private readonly messageService!: MessageService;

    getFollowing(username: string, thenCallback: (response: AxiosResponse<Account[]>) => void) {
        axios.get(`${this.baseUrl}/following/${username}`)
            .then(response => {
                thenCallback(response);
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    getFollowers(username: string, thenCallback: (response: AxiosResponse<Account[]>) => void) {
        axios.get(`${this.baseUrl}/followers/${username}`)
            .then(response => {
                thenCallback(response);
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    follow(username: string, thenCallback: () => void) {
        axios.post<string>(`${this.baseUrl}/following/${username}`, {})
            .then(response => {
                thenCallback();
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    unfollow(username: string, thenCallback: () => void) {
        axios.delete<string>(`${this.baseUrl}/following/${username}`, {})
            .then(response => {
                thenCallback();
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }
}
