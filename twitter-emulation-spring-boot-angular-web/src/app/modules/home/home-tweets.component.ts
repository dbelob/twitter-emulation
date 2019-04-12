import { Component } from '@angular/core';
import { HomeComponent } from "./home.component";
import { Tweet } from "../../models/tweet.model";
import { AuthenticationService } from "../../services/authentication.service";
import { AccountService } from "../../services/account.service";
import { TweetService } from "../../services/tweet.service";
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-home-tweets',
  templateUrl: './home-tweets.component.html'
})
export class HomeTweetsComponent extends HomeComponent {
  private tweets: Tweet[] = [];

  constructor(authenticationService: AuthenticationService, accountService: AccountService, protected tweetService: TweetService) {
    super(authenticationService, accountService);
  }

  getData() {
    this.getTweets().subscribe(data => {
      this.tweets = data;
    });
  }

  getTweets(): Observable<Tweet[]> {
    return of([]);
  }
}
