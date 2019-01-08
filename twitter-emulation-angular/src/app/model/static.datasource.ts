import {Injectable} from '@angular/core';
import {Tweet} from './tweet.model';
import {from, Observable} from 'rxjs';

@Injectable()
export class StaticDataSource {
  private tweets: Tweet[] = [
    new Tweet(1, 1, 'Tweet 1', new Date()),
    new Tweet(2, 1, 'Tweet 2', new Date()),
    new Tweet(3, 1, 'Tweet 3', new Date()),
    new Tweet(4, 1, 'Tweet 4', new Date()),
    new Tweet(5, 1, 'Tweet 5', new Date()),
    new Tweet(6, 1, 'Tweet 6', new Date()),
    new Tweet(7, 2, 'Tweet 7', new Date()),
    new Tweet(8, 2, 'Tweet 8', new Date()),
    new Tweet(9, 2, 'Tweet 9', new Date()),
  ];

  getTweets(): Observable<Tweet[]> {
    return from([this.tweets]);
  }
}
