import { catchError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { Axios, AxiosObservable } from 'axios-observable';
import { inject, injectable } from 'inversify';
import { Tweet } from '../models/Tweet';
import { MessageService } from '../MessageService';

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

    getTimeline(): Observable<Tweet[]> {
        return Axios.get(`${this.baseUrl}/timeline`)
            .pipe(
                map(response => response.data),
                catchError((err: AxiosError) => {
                    this.messageService.reportMessage(err.response);
                    throw err;
                })
            );
    }
}
