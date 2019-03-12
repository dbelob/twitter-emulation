import { Component, OnInit } from '@angular/core';
import { Tweet } from "../tweet";
import { TweetService } from "../tweet.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  tweets: Tweet[] = [];

  constructor(private tweet: TweetService) {
    tweet.getTweets().subscribe(data => {
      this.tweets = data;
    });
  }

  ngOnInit() {
  }
}
