import { Component } from '@angular/core';
import { AuthenticationService } from "../../shared/services/authentication.service";
import { AccountService } from "../../shared/services/account.service";
import { TweetService } from "../../shared/services/tweet.service";
import { HomeTweetsComponent } from "./home-tweets.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './home-tweets.component.html'
})
export class AccountComponent extends HomeTweetsComponent {
  constructor(authenticationService: AuthenticationService, accountService: AccountService, activatedRoute: ActivatedRoute,
              router: Router, private tweetService: TweetService) {
    super(authenticationService, accountService, activatedRoute, router);
  }

  getData(userName: string) {
    this.tweetService.getTimeline().subscribe(data => {
      this.tweets = data;
    });
  }
}
