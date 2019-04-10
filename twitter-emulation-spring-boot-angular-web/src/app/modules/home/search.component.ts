import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AccountService } from "../../services/account.service";
import { Account } from "../../models/account.model";
import { AuthenticationService } from "../../services/authentication.service";
import { HomeComponent } from "./home.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent extends HomeComponent {
  private accounts: Account[] = [];

  constructor(authenticationService: AuthenticationService, accountService: AccountService, private route: ActivatedRoute) {
    super(authenticationService, accountService);
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      let searchText = params["searchText"];

      this.accountService.getAccounts(searchText).subscribe(data => {
        this.accounts = data;
      });
    });
  }
}
