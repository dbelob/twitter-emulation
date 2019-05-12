import { Component } from '@angular/core';
import { HomeTweetsComponent } from "./home-tweets.component";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { AccountService } from "../../shared/services/account.service";
import { TweetService } from "../../shared/services/tweet.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-tweets',
  templateUrl: './home-tweets.component.html'
})
export class TweetsComponent extends HomeTweetsComponent {
  constructor(authenticationService: AuthenticationService, accountService: AccountService, activatedRoute: ActivatedRoute,
              router: Router, private tweetService: TweetService) {
    super(authenticationService, accountService, activatedRoute, router);

    this.title = 'Tweets';
  }

  getData(userName: string) {
    this.tweetService.getTweets(userName).subscribe(data => {
      this.tweets = data;
    });
  }
}
