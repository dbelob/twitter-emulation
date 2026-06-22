import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observer, Subject } from 'rxjs';
import { HomeAccountComponent } from './home-account.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FollowerService } from '../../shared/services/follower.service';
import { USER_STATE, UserState } from '../../shared/models/user-state.model';
import { HomeComponent } from './home.component';

@Component({
    selector: 'app-following',
    templateUrl: './home-account.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [HomeComponent, RouterLink],
    providers: [{ provide: USER_STATE, useValue: new Subject<UserState>() }]
})
export class FollowingComponent extends HomeAccountComponent {
  constructor(authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
              @Inject(USER_STATE) observer: Observer<UserState>, private followerService: FollowerService) {
    super(authenticationService, activatedRoute, router, observer);

    this.title = 'Following';
  }

  getData(username: string) {
    this.followerService.getFollowing(username)
      .subscribe(data => {
        this.accounts = data;
      });
  }
}
