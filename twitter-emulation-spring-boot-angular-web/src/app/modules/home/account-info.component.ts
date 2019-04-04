import { Component, OnInit } from '@angular/core';
import { Account } from "../../models/account.model";
import { AuthenticationService } from "../../services/authentication.service";
import { AccountService } from "../../services/account.service";
import { AccountStatistics } from "../../models/account-statistics.model";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html'
})
export class AccountInfoComponent implements OnInit {
  private account: Account = new Account();
  private accountStatistics: AccountStatistics = new AccountStatistics();

  constructor(private authenticationService: AuthenticationService, private accountService: AccountService) {
    authenticationService.getUser().subscribe(user => {
      accountService.getAccount(user.name).subscribe(data => {
        this.account = data;
      });

      accountService.getAccountStatistics(user.name).subscribe(data => {
        this.accountStatistics = data;
      });
    });
  }

  ngOnInit() {
  }
}
