import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AccountService } from "../../shared/services/account.service";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { HomeAccountComponent } from "./home-account.component";

@Component({
  selector: 'app-search',
  templateUrl: './home-account.component.html'
})
export class SearchComponent extends HomeAccountComponent {
  constructor(authenticationService: AuthenticationService, accountService: AccountService, private activatedRoute: ActivatedRoute) {
    super(authenticationService, accountService, activatedRoute);

    this.title = 'Search Result';
  }

  getData(userName: string) {
    this.activatedRoute.queryParams.subscribe(params => {
      let searchText = params["searchText"];

      this.accountService.getAccounts(searchText).subscribe(data => {
        this.accounts = data;
      });
    });
  }
}
