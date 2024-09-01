import axios, { AxiosError } from 'axios';
import { inject, injectable } from 'inversify';
import { Account } from '../models/Account';
import { MessageService } from '../../message/MessageService';

@injectable()
export class FollowerService {
    private readonly baseUrl = '/api/follower';

    @inject(MessageService)
    private readonly messageService!: MessageService;

    getFollowing(username: string) {
        return axios.get<Account[]>(`${this.baseUrl}/following/${username}`)
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    getFollowers(username: string) {
        return axios.get<Account[]>(`${this.baseUrl}/followers/${username}`)
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    follow(username: string) {
        return axios.post<string>(`${this.baseUrl}/following/${username}`, {})
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    unfollow(username: string) {
        return axios.delete<string>(`${this.baseUrl}/following/${username}`, {})
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }
}
