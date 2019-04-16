import { Component } from '@angular/core';
import { HomeComponent } from "./home.component";
import { Tweet } from "../../models/tweet.model";
import { AuthenticationService } from "../../services/authentication.service";
import { AccountService } from "../../services/account.service";
import { TweetService } from "../../services/tweet.service";

@Component({
  selector: 'app-home-tweets',
  templateUrl: './home-tweets.component.html'
})
export class HomeTweetsComponent extends HomeComponent {
  protected tweets: Tweet[] = [];

  constructor(authenticationService: AuthenticationService, accountService: AccountService, protected tweetService: TweetService) {
    super(authenticationService, accountService);
  }
}
