import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observer } from "rxjs";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { TweetService } from "../../shared/services/tweet.service";
import { HomeTweetsComponent } from "./home-tweets.component";
import { DATA_USERNAME } from "../../shared/models/user.model";

@Component({
  selector: 'app-account',
  templateUrl: './home-tweets.component.html'
})
export class AccountComponent extends HomeTweetsComponent {
  constructor(authenticationService: AuthenticationService, activatedRoute: ActivatedRoute,
              @Inject(DATA_USERNAME) observer: Observer<string>, private tweetService: TweetService) {
    super(authenticationService, activatedRoute, observer);
  }

  getData(userName: string) {
    this.tweetService.getTimeline().subscribe(data => {
      this.tweets = data;
    });
  }
}
