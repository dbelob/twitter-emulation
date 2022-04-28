import { Axios, AxiosObservable } from 'axios-observable';
import dateTransformer from 'axios-date-reviver'
import { catchError } from 'rxjs';
import { Tweet } from './Tweet';

export class TweetDataSource {
    private baseUrl = '/api/tweet';

    constructor() {
        Axios.defaults.transformResponse = [dateTransformer]
    }

    getTweets(username: string): AxiosObservable<Tweet[]> {
        return Axios.get(`${this.baseUrl}/tweets/${username}`)
            .pipe(
                catchError((response: Response) => {
                    // TODO: use messageService
                    console.log('getTweets error, response: ' + JSON.stringify(response));
                    // this.messageService.reportMessage(response);
                    throw response;
                })
            );
    }

    getTimeline(): AxiosObservable<Tweet[]> {
        return Axios.get(`${this.baseUrl}/timeline`)
            .pipe(
                catchError((response: Response) => {
                    // TODO: use messageService
                    console.log('getTimeline error, response: ' + JSON.stringify(response));
                    // this.messageService.reportMessage(response);
                    throw response;
                })
            );
    }
}
