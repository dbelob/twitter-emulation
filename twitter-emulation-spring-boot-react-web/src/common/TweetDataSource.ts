/* eslint-disable no-unused-vars */
import { AxiosError } from 'axios';
import { Axios, AxiosObservable } from 'axios-observable';
import { catchError } from 'rxjs';
import { inject, injectable } from 'inversify';
import { Tweet } from './Tweet';
import { MessageService } from './MessageService';

@injectable()
export class TweetDataSource {
    private readonly baseUrl = '/api/tweet';

    @inject(MessageService)
    private readonly messageService!: MessageService;

    getTweets(username: string): AxiosObservable<Tweet[]> {
        return Axios.get(`${this.baseUrl}/tweets/${username}`)
            .pipe(
                catchError((err: AxiosError) => {
                    this.messageService.reportMessage(err.response);
                    throw err;
                })
            );
    }

    getTimeline(): AxiosObservable<Tweet[]> {
        return Axios.get(`${this.baseUrl}/timeline`)
            .pipe(
                catchError((err: AxiosError) => {
                    this.messageService.reportMessage(err.response);
                    throw err;
                })
            );
    }
}
