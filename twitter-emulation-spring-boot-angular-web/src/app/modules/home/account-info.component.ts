import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserState } from '../../shared/models/user-state.model';
import { AccountStatistics } from '../../shared/models/account-statistics.model';
import { AccountService } from '../../shared/services/account.service';
import { FollowerService } from '../../shared/services/follower.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html'
})
export class AccountInfoComponent {
  @Input('userState')
  userState: UserState;

  public accountStatistics: AccountStatistics = new AccountStatistics();

  constructor(private accountService: AccountService, private followerService: FollowerService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const userStateChange: SimpleChange = changes.userState;

    // User state
    if (userStateChange) {
      const currentUserState: UserState = userStateChange.currentValue;

      if (currentUserState) {
        const username = currentUserState.getDataUserName();

        if (username) {
          this.accountService.getAccountStatistics(username)
            .subscribe(data => {
              this.accountStatistics = data;
            });
        }
      }
    }
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
