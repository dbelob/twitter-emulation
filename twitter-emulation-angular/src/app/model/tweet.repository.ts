import {Injectable} from '@angular/core';
import {Tweet} from './tweet.model';
import {StaticDataSource} from './static.datasource';


@Injectable()
export class TweetRepository {
  private tweets: Tweet[] = [];

  constructor(private dataSource: StaticDataSource) {
    dataSource.getTweets().subscribe(data => {
      this.tweets = data;
    });
  }

  getTweets(): Tweet[] {
    return this.tweets;
  }

  getTweet(id: number): Tweet {
    return this.tweets.find(p => p.id === id);
  }
}
