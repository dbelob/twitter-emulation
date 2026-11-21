import axios, { AxiosError } from 'axios';
import { injectable, inject } from 'inversify-hooks';
import { Account } from '../models/Account';
import { MessageService } from '../../message/MessageService';

@injectable()
export class FollowerService {
    private readonly baseUrl = '/api/follower';

    @inject() private readonly messageService!: MessageService;

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
