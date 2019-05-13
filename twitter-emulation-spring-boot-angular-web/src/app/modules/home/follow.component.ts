import { Component, Input, OnInit } from '@angular/core';
import { Account } from "../../shared/models/account.model";
import { User } from "../../shared/models/user.model";

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html'
})
export class FollowComponent implements OnInit {
  @Input('authenticatedUser')
  authenticatedUser: User;

  @Input('account')
  account: Account;

  private isFollowVisible = false;
  private copyrightDate = new Date();

  constructor() {
  }

  ngOnInit() {
    //TODO: change
    this.isFollowVisible = false; //this.authenticatedUser.name !== this.account.username;
  }

  follow() {
    //TODO: implement
  }

  unfollow() {
    //TODO: implement
  }
}
