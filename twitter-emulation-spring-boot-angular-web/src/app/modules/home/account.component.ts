import { Component, OnInit } from '@angular/core';
import { Account } from "../../models/account.model";
import { AccountStatistics } from "../../models/account-statistics.model";
import { Tweet } from "../../models/tweet.model";
import { AuthenticationService } from "../../services/authentication.service";
import { AccountService } from "../../services/account.service";
import { TweetService } from "../../services/tweet.service";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  private user: User = new User();
  private account: Account = new Account();
  private accountStatistics: AccountStatistics = new AccountStatistics();
  private tweets: Tweet[] = [];

  constructor(private authenticationService: AuthenticationService, private accountService: AccountService, private tweetService: TweetService) {
    authenticationService.getUser().subscribe(user => {
      this.user = user;

      accountService.getAccount(user.name).subscribe(data => {
        this.account = data;
      });

      accountService.getAccountStatistics(user.name).subscribe(data => {
        this.accountStatistics = data;
      });
    });

    tweetService.getTimeline().subscribe(data => {
      this.tweets = data;
    });
  }

  ngOnInit() {
  }
}
