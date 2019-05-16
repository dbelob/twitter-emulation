import { Component, Input } from '@angular/core';
import { UserState } from "../../shared/models/user-state.model";
import { AccountStatistics } from "../../shared/models/account-statistics.model";

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html'
})
export class FollowComponent {
  @Input('userState')
  userState: UserState;

  @Input('accountStatistics')
  accountStatistics: AccountStatistics;

  private copyrightDate = new Date();

  constructor() {
  }

  follow() {
    //TODO: implement
  }

  unfollow() {
    //TODO: implement
  }

  isFollowVisible(): boolean {
    return this.userState.isAuthenticated() && (this.userState.authenticatedUserName !== this.userState.selectedUserName);
  }
}
