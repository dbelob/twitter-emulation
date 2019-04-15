import { Component } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { AccountService } from "../../services/account.service";
import { TweetService } from "../../services/tweet.service";
import { HomeTweetsComponent } from "./home-tweets.component";

@Component({
  selector: 'app-account',
  template: '<app-home-tweets></app-home-tweets>'
})
export class AccountComponent extends HomeTweetsComponent {
  constructor(authenticationService: AuthenticationService, accountService: AccountService, tweetService: TweetService) {
    super(authenticationService, accountService, tweetService);
  }

  getData() {
    this.tweetService.getTimeline().subscribe(data => {
      this.tweets = data;
    });
  }
}
