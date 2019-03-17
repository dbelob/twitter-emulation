import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tweet } from "../models/tweet.model";

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  baseUrl = 'api/tweet/';

  constructor(private http: HttpClient) {
  }

  getTimeline(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.baseUrl + 'timeline');
  }
}
