import { Component } from '@angular/core';
import { Tweet } from "../../models/tweet.model";
import { AuthenticationService } from "../../services/authentication.service";
import { AccountService } from "../../services/account.service";
import { TweetService } from "../../services/tweet.service";
import { HomeComponent } from "./home.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent extends HomeComponent {
  private tweets: Tweet[] = [];

  constructor(authenticationService: AuthenticationService, accountService: AccountService, private tweetService: TweetService) {
    super(authenticationService, accountService);
  }

  getData() {
    this.tweetService.getTimeline().subscribe(data => {
      this.tweets = data;
    });
  }
}
