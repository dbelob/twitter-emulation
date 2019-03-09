import { Component, OnInit } from '@angular/core';

export class Account {
  constructor(
    public username?: string,
    public description?: string
  ) {
  }
}

export class AccountStatistics {
  constructor(
    public tweetsCount?: number,
    public followingCount?: number,
    public followersCount?: number
  ) {
  }
}

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html'
})
export class AccountInfoComponent implements OnInit {
  private account: Account = new Account('jsmith', 'John Smith');
  private accountStatistics: AccountStatistics = new AccountStatistics(6, 2, 1);

  constructor() {
  }

  ngOnInit() {
  }
}
