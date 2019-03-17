import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tweet } from "../models/tweet";

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  baseUrl = 'api/tweet/';

  constructor(private http: HttpClient) {
  }

  getTweets(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.baseUrl + 'timeline');
  }
}
