import axios, { AxiosError, AxiosResponse } from 'axios';
import { inject, injectable } from 'inversify';
import { Tweet } from '../models/Tweet';
import { MessageService } from '../../message/MessageService';

@injectable()
export class TweetService {
    private readonly baseUrl = '/api/tweet';

    @inject(MessageService)
    private readonly messageService!: MessageService;

    getTweets(username: string, thenCallback: (response: AxiosResponse<Tweet[]>) => void) {
        axios.get(`${this.baseUrl}/tweets/${username}`)
            .then(response => {
                thenCallback(response);
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error.response);
                throw error;
            });
    }

    tweet(text: string, thenCallback: (response: AxiosResponse<string>) => void) {
        const config = {
            headers: {
                'Content-Type': 'text/plain'
            }
        };

        axios.post<string>(`${this.baseUrl}/tweets`, text, config)
            .then(response => {
                thenCallback(response);
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error.response);
                throw error;
            });
    }

    async getTimeline(thenCallback: (response: AxiosResponse<Tweet[]>) => void) {
        try {
            const response = await axios.get(`${this.baseUrl}/timeline`);
            thenCallback(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                this.messageService.reportMessage(error.response);
            }

            throw error;
        }
    }
}
