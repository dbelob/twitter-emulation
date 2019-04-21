import { Component } from '@angular/core';
import { HomeAccountComponent } from "./home-account.component";
import { AuthenticationService } from "../../services/authentication.service";
import { AccountService } from "../../services/account.service";
import { FollowerService } from "../../services/follower.service";

@Component({
  selector: 'app-following',
  templateUrl: './home-account.component.html'
})
export class FollowingComponent extends HomeAccountComponent {
  constructor(authenticationService: AuthenticationService, accountService: AccountService, private followerService: FollowerService) {
    super(authenticationService, accountService);

    this.title = 'Following';
  }

  getData(userName: string) {
    this.followerService.getFollowing(userName).subscribe(data => {
      this.accounts = data;
    });
  }
}
