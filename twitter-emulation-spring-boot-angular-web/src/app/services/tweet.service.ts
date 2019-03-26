import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Tweet } from "../models/tweet.model";
import { catchError } from "rxjs/operators";
import { MessageService } from "../components/message/message.service";

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  baseUrl = 'api/tweet/';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getTimeline(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.baseUrl + 'timeline').pipe(
      catchError((response: Response) => {
        return throwError(this.messageService.getMessageText(response));
      })
    );
  }

  tweet(text: string): Observable<string> {
    return this.http.post<string>(this.baseUrl + 'tweets', text)
      .pipe(
        catchError((response: Response) => {
          return throwError(this.messageService.getMessageText(response));
        })
      );
  }
}
