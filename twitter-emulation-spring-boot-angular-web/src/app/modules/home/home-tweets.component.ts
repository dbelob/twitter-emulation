import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observer } from 'rxjs';
import { Tweet } from '../../shared/models/tweet.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { HomeChild } from './home-child';
import { USER_STATE, UserState } from '../../shared/models/user-state.model';
import { HomeComponent } from './home.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-home-tweets',
    templateUrl: './home-tweets.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [HomeComponent, RouterLink, DatePipe]
})
export class HomeTweetsComponent extends HomeChild {
  public tweets: Tweet[] = [];

  constructor(authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
              @Inject(USER_STATE) observer: Observer<UserState>) {
    super(authenticationService, activatedRoute, router, observer);
  }
}
