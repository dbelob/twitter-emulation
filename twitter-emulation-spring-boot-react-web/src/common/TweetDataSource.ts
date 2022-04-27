import { Axios, AxiosObservable } from 'axios-observable';
import { catchError } from 'rxjs';
import { Tweet } from './Tweet';

export class TweetDataSource {
    private baseUrl = 'api/tweet';

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
}
