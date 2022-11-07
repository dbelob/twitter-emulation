import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tweet } from '../models/tweet.model';
import { MessageService } from '../../modules/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private baseUrl = 'api/tweet';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getTweets(username: string): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(`${this.baseUrl}/tweets/${username}`)
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      );
  }

  tweet(text: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/tweets`, text)
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      );
  }

  getTimeline(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(`${this.baseUrl}/timeline`)
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      );
  }
}
