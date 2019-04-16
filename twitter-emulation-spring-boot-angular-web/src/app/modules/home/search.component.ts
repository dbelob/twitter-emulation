import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AccountService } from "../../services/account.service";
import { AuthenticationService } from "../../services/authentication.service";
import { HomeAccountComponent } from "./home-account.component";

@Component({
  selector: 'app-search',
  template: '<app-home-account></app-home-account>'
})
export class SearchComponent extends HomeAccountComponent {
  constructor(authenticationService: AuthenticationService, accountService: AccountService, private route: ActivatedRoute) {
    super(authenticationService, accountService);
  }

  getData(userName: string) {
    this.route.queryParams.subscribe(params => {
      let searchText = params["searchText"];

      this.accountService.getAccounts(searchText).subscribe(data => {
        this.accounts = data;
      });
    });
  }
}
