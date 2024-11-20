import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { HomeAccountComponent } from './home-account.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FollowerService } from '../../shared/services/follower.service';
import { USER_STATE, UserState } from '../../shared/models/user-state.model';

@Component({
    selector: 'app-followers',
    templateUrl: './home-account.component.html',
    standalone: false
})
export class FollowersComponent extends HomeAccountComponent {
  constructor(authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
              @Inject(USER_STATE) observer: Observer<UserState>, private followerService: FollowerService) {
    super(authenticationService, activatedRoute, router, observer);

    this.title = 'Followers';
  }

  getData(username: string) {
    this.followerService.getFollowers(username)
      .subscribe(data => {
        this.accounts = data;
      });
  }
}
