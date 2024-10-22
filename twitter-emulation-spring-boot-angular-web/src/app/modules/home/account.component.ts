import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { TweetService } from '../../shared/services/tweet.service';
import { HomeTweetsComponent } from './home-tweets.component';
import { USER_STATE, UserState } from '../../shared/models/user-state.model';

@Component({
  selector: 'app-account',
  templateUrl: './home-tweets.component.html'
})
export class AccountComponent extends HomeTweetsComponent {
  constructor(authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
              @Inject(USER_STATE) observer: Observer<UserState>, private tweetService: TweetService) {
    super(authenticationService, activatedRoute, router, observer);
  }

  getData() {
    this.tweetService.getTimeline()
      .subscribe(data => {
        this.tweets = data;
      });
  }
}
