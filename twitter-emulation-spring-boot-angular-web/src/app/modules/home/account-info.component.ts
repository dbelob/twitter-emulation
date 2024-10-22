import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { UserState } from '../../shared/models/user-state.model';
import { AccountStatistics } from '../../shared/models/account-statistics.model';
import { AccountService } from '../../shared/services/account.service';
import { FollowerService } from '../../shared/services/follower.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html'
})
export class AccountInfoComponent implements OnChanges {
  @Input()
  userState: UserState;

  public accountStatistics: AccountStatistics = new AccountStatistics();

  constructor(private accountService: AccountService, private followerService: FollowerService) {
  }

  loadAccountStatistics(userState: UserState) {
    const username = userState.getDataUserName();

    if (username) {
      this.accountService.getAccountStatistics(username)
        .subscribe(data => {
          this.accountStatistics = data;
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const userStateChange: SimpleChange = changes.userState;

    // User state
    if (userStateChange) {
      const currentUserState: UserState = userStateChange.currentValue;

      if (currentUserState) {
        this.loadAccountStatistics(currentUserState);
      }
    }
  }

  follow() {
    this.followerService.follow(this.userState.selectedUserName)
      .subscribe(() => {
        this.loadAccountStatistics(this.userState);
      });
  }

  unfollow() {
    this.followerService.unfollow(this.userState.selectedUserName)
      .subscribe(() => {
        this.loadAccountStatistics(this.userState);
      });
  }

  isFollowVisible(): boolean {
    return this.userState.isAuthenticated() && (this.userState.authenticatedUserName !== this.userState.selectedUserName);
  }
}
