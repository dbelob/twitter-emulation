import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
import { Account } from "../../models/account.model";
import { AccountStatistics } from "../../models/account-statistics.model";
import { AuthenticationService } from "../../services/authentication.service";
import { AccountService } from "../../services/account.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  protected user: User = new User();
  protected account: Account = new Account();
  protected accountStatistics: AccountStatistics = new AccountStatistics();

  constructor(private authenticationService: AuthenticationService, protected accountService: AccountService) {
  }

  getData() {
  };

  ngOnInit() {
    this.authenticationService.getUser().subscribe(user => {
      this.user = user;

      this.accountService.getAccount(user.name).subscribe(data => {
        this.account = data;
      });

      this.accountService.getAccountStatistics(user.name).subscribe(data => {
        this.accountStatistics = data;
      });
    });

    this.getData();
  }
}
