import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { UserState } from "../../shared/models/user-state.model";
import { AccountStatistics } from "../../shared/models/account-statistics.model";
import { FollowerService } from "../../shared/services/follower.service";

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html'
})
export class FollowComponent {
  @Input('userState')
  userState: UserState;

  @Input('accountStatistics')
  accountStatistics: AccountStatistics;

  public copyrightDate = new Date();

  constructor(private followerService: FollowerService, private router: Router) {
  }

  follow() {
    this.followerService.follow(this.userState.selectedUserName)
      .subscribe(data => {
        this.router.navigate(['/account', 'show', this.userState.selectedUserName]);
      });
  }

  unfollow() {
    this.followerService.unfollow(this.userState.selectedUserName)
      .subscribe(data => {
        this.router.navigate(['/account', 'show', this.userState.selectedUserName]);
      });
  }

  isFollowVisible(): boolean {
    return this.userState.isAuthenticated() && (this.userState.authenticatedUserName !== this.userState.selectedUserName);
  }
}
