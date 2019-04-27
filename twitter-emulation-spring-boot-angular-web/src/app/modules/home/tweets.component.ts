import { Component } from '@angular/core';
import { HomeTweetsComponent } from "./home-tweets.component";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { AccountService } from "../../shared/services/account.service";
import { TweetService } from "../../shared/services/tweet.service";

@Component({
  selector: 'app-tweets',
  templateUrl: './home-tweets.component.html'
})
export class TweetsComponent extends HomeTweetsComponent {
  constructor(authenticationService: AuthenticationService, accountService: AccountService, private tweetService: TweetService) {
    super(authenticationService, accountService);

    this.title = 'Tweets';
  }

  getData(userName: string) {
    this.tweetService.getTweets(userName).subscribe(data => {
      this.tweets = data;
    });
  }
}
