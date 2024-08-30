import axios, { AxiosError } from 'axios';
import { inject, injectable } from 'inversify';
import { Tweet } from '../models/Tweet';
import { MessageService } from '../../message/MessageService';

@injectable()
export class TweetService {
    private readonly baseUrl = '/api/tweet';

    @inject(MessageService)
    private readonly messageService!: MessageService;

    getTweets(username: string) {
        return axios.get<Tweet[]>(`${this.baseUrl}/tweets/${username}`)
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    tweet(text: string) {
        const config = {
            headers: {
                'Content-Type': 'text/plain'
            }
        };

        return axios.post<string>(`${this.baseUrl}/tweets`, text, config)
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }

    getTimeline() {
        return axios.get<Tweet[]>(`${this.baseUrl}/timeline`)
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }
}
