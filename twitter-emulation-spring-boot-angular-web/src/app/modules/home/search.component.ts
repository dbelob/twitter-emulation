import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { HomeAccountComponent } from "./home-account.component";
import { DATA_USERNAME } from "../../shared/models/user.model";
import { Observer } from "rxjs";
import { AccountService } from "../../shared/services/account.service";

@Component({
  selector: 'app-search',
  templateUrl: './home-account.component.html'
})
export class SearchComponent extends HomeAccountComponent {
  constructor(authenticationService: AuthenticationService, private activatedRoute: ActivatedRoute, router: Router,
              @Inject(DATA_USERNAME) observer: Observer<string>, private accountService: AccountService) {
    super(authenticationService, activatedRoute, router, observer);

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
