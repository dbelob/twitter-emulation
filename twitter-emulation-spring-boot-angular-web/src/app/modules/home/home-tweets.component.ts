import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { Tweet } from '../../shared/models/tweet.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { HomeChild } from './home-child';
import { USER_STATE, UserState } from '../../shared/models/user-state.model';

@Component({
    selector: 'app-home-tweets',
    templateUrl: './home-tweets.component.html',
    standalone: false
})
export class HomeTweetsComponent extends HomeChild {
  public tweets: Tweet[] = [];

  constructor(authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
              @Inject(USER_STATE) observer: Observer<UserState>) {
    super(authenticationService, activatedRoute, router, observer);
  }
}
