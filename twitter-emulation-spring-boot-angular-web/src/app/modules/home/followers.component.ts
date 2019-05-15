import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observer } from "rxjs";
import { HomeAccountComponent } from "./home-account.component";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { FollowerService } from "../../shared/services/follower.service";
import { DATA_USERNAME } from "../../shared/models/user.model";

@Component({
  selector: 'app-followers',
  templateUrl: './home-account.component.html'
})
export class FollowersComponent extends HomeAccountComponent {
  constructor(authenticationService: AuthenticationService, activatedRoute: ActivatedRoute,
              @Inject(DATA_USERNAME) observer: Observer<string>, private followerService: FollowerService) {
    super(authenticationService, activatedRoute, observer);

    this.title = 'Followers';
  }

  getData(userName: string) {
    this.followerService.getFollowers(userName).subscribe(data => {
      this.accounts = data;
    });
  }
}
