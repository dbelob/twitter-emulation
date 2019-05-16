import { Component, Input, OnInit } from '@angular/core';
import { UserState } from "../../shared/models/user-state.model";
import { Account } from "../../shared/models/account.model";

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html'
})
export class FollowComponent implements OnInit {
  @Input('userState')
  userState: UserState;

  @Input('account')
  account: Account;

  private isFollowVisible = false;
  private copyrightDate = new Date();

  constructor() {
  }

  ngOnInit() {
    //TODO: change
    this.isFollowVisible = this.userState.isAuthenticated() && (this.userState.authenticatedUserName !== this.userState.selectedUserName);
  }

  follow() {
    //TODO: implement
  }

  unfollow() {
    //TODO: implement
  }
}
