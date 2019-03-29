import { Component, OnInit } from '@angular/core';
import { Tweet } from "../../models/tweet.model";
import { TweetService } from "../../services/tweet.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  private tweets: Tweet[] = [];

  constructor(private tweetService: TweetService) {
    tweetService.getTimeline().subscribe(data => {
      this.tweets = data;
    });
  }

  ngOnInit() {
  }
}
