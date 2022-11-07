import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../../modules/message/message.service';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {
  private baseUrl = 'api/follower';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getFollowing(username: string): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/following/${username}`)
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      )
  }

  getFollowers(username: string): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/followers/${username}`)
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      )
  }

  follow(username: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/following/${username}`, {})
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      )
  }

  unfollow(username: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/following/${username}`, {})
      .pipe(
        catchError((response: Response) => {
          this.messageService.reportMessage(response);
          throw response;
        })
      )
  }
}
