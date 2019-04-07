import { Component, Input, OnInit } from '@angular/core';
import { Account } from "../../models/account.model";
import { AccountStatistics } from "../../models/account-statistics.model";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html'
})
export class AccountInfoComponent implements OnInit {
  @Input('account')
  account: Account;

  @Input('accountStatistics')
  accountStatistics: AccountStatistics;

  constructor() {
  }

  ngOnInit() {
  }
}
