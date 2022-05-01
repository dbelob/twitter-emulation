import { Axios, AxiosObservable } from 'axios-observable';
import dateTransformer from 'axios-date-reviver'
import { catchError } from 'rxjs';
import { injectable } from 'inversify';
import { resolve } from 'inversify-react';
import { Tweet } from './Tweet';
import { MessageService } from './MessageService';

@injectable()
export class TweetDataSource {
    private readonly baseUrl = '/api/tweet';

    @resolve(MessageService)
    private readonly messageService!: MessageService;

    constructor() {
        Axios.defaults.transformResponse = [dateTransformer]
    }

    getTweets(username: string): AxiosObservable<Tweet[]> {
        return Axios.get(`${this.baseUrl}/tweets/${username}`)
            .pipe(
                catchError((response: Response) => {
                    this.messageService.reportMessage(response);
                    throw response;
                })
            );
    }

    getTimeline(): AxiosObservable<Tweet[]> {
        return Axios.get(`${this.baseUrl}/timeline`)
            .pipe(
                catchError((response: Response) => {
                    this.messageService.reportMessage(response);
                    throw response;
                })
            );
    }
}
