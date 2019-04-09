import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AccountService } from "../../services/account.service";
import { Account } from "../../models/account.model";
import { AuthenticationService } from "../../services/authentication.service";
import { User } from "../../models/user.model";
import { AccountStatistics } from "../../models/account-statistics.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  private user: User = new User();
  private account: Account = new Account();
  private accountStatistics: AccountStatistics = new AccountStatistics();
  private accounts: Account[] = [];

  constructor(authenticationService: AuthenticationService, route: ActivatedRoute, accountService: AccountService) {
    route.queryParams.subscribe(params => {
      let searchText = params["searchText"];

      authenticationService.getUser().subscribe(user => {
        this.user = user;

        accountService.getAccount(user.name).subscribe(data => {
          this.account = data;
        });

        accountService.getAccountStatistics(user.name).subscribe(data => {
          this.accountStatistics = data;
        });
      });


      accountService.getAccounts(searchText).subscribe(data => {
        this.accounts = data;
      });
    });
  }

  ngOnInit() {
  }
}
