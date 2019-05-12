import { Component } from '@angular/core';
import { HomeAccountComponent } from "./home-account.component";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { AccountService } from "../../shared/services/account.service";
import { FollowerService } from "../../shared/services/follower.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-following',
  templateUrl: './home-account.component.html'
})
export class FollowingComponent extends HomeAccountComponent {
  constructor(authenticationService: AuthenticationService, accountService: AccountService, activatedRoute: ActivatedRoute,
              router: Router, private followerService: FollowerService) {
    super(authenticationService, accountService, activatedRoute, router);

    this.title = 'Following';
  }

  getData(userName: string) {
    this.followerService.getFollowing(userName).subscribe(data => {
      this.accounts = data;
    });
  }
}
