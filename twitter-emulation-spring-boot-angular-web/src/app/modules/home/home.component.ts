import { Component, OnInit } from '@angular/core';
import { User } from "../../shared/models/user.model";
import { Account } from "../../shared/models/account.model";
import { AccountStatistics } from "../../shared/models/account-statistics.model";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { AccountService } from "../../shared/services/account.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  protected user: User = new User();
  protected account: Account = new Account();
  protected accountStatistics: AccountStatistics = new AccountStatistics();
  protected title: string;

  constructor(private authenticationService: AuthenticationService, protected accountService: AccountService) {
  }

  getData(userName: string) {
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

      this.getData(user.name);
    });
  }
}
