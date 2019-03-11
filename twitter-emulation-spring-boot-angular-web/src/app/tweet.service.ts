import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tweet } from "./tweet";

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  baseUrl = '/api/';

  constructor(private http: HttpClient) {
  }

  getTweets(): Observable<Tweet[]> {
    const params = new HttpParams();
    params.append('username', 'jsmith');

    return this.http.get<Tweet[]>(this.baseUrl + 'tweet/timeline');
  }
}
