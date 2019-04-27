import { Component, Input, OnInit } from '@angular/core';
import { Account } from "../../shared/models/account.model";
import { User } from "../../shared/models/user.model";

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html'
})
export class FollowComponent implements OnInit {
  @Input('user')
  user: User;

  @Input('account')
  account: Account;

  private isFollowVisible = false;
  private copyrightDate = new Date();

  constructor() {
  }

  ngOnInit() {
    this.isFollowVisible = this.user.name !== this.account.username;
  }

  follow() {
    //TODO: implement
  }

  unfollow() {
    //TODO: implement
  }
}
