import { Component } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { AccountService } from "../../services/account.service";
import { TweetService } from "../../services/tweet.service";
import { HomeTweetsComponent } from "./home-tweets.component";

@Component({
  selector: 'app-account',
  templateUrl: './home-tweets.component.html'
})
export class AccountComponent extends HomeTweetsComponent {
  constructor(authenticationService: AuthenticationService, accountService: AccountService, private tweetService: TweetService) {
    super(authenticationService, accountService);
  }

  getData(userName: string) {
    this.tweetService.getTimeline().subscribe(data => {
      this.tweets = data;
    });
  }
}
