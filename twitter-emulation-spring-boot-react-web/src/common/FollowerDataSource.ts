import { Axios, AxiosObservable } from 'axios-observable';
import { catchError } from 'rxjs';
import { inject, injectable } from 'inversify';
import { MessageService } from './MessageService';
import { Account } from './Account';

@injectable()
export class FollowerDataSource {
    private readonly baseUrl = '/api/follower';

    @inject(MessageService)
    private readonly messageService!: MessageService;

    getFollowing(username: string): AxiosObservable<Account[]> {
        return Axios.get(`${this.baseUrl}/following/${username}`)
            .pipe(
                catchError(err => {
                    this.messageService.reportMessage(err.response);
                    throw err;
                })
            );
    }

    getFollowers(username: string): AxiosObservable<Account[]> {
        return Axios.get(`${this.baseUrl}/followers/${username}`)
            .pipe(
                catchError(err => {
                    this.messageService.reportMessage(err.response);
                    throw err;
                })
            );
    }
}
