import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observer } from 'rxjs';
import { HomeTweetsComponent } from './home-tweets.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { TweetService } from '../../shared/services/tweet.service';
import { USER_STATE, UserState } from '../../shared/models/user-state.model';
import { HomeComponent } from './home.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-tweets',
    templateUrl: './home-tweets.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [HomeComponent, RouterLink, DatePipe]
})
export class TweetsComponent extends HomeTweetsComponent {
  constructor(authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
              @Inject(USER_STATE) observer: Observer<UserState>, private tweetService: TweetService) {
    super(authenticationService, activatedRoute, router, observer);

    this.title = 'Tweets';
  }

  getData(username: string) {
    this.tweetService.getTweets(username)
      .subscribe(data => {
        this.tweets = data;
      });
  }
}
