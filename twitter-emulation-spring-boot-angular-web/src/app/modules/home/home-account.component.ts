import { Component } from '@angular/core';
import { HomeComponent } from "./home.component";
import { Account } from "../../models/account.model";
import { AuthenticationService } from "../../services/authentication.service";
import { AccountService } from "../../services/account.service";

@Component({
  selector: 'app-home-account',
  templateUrl: './home-account.component.html'
})
export class HomeAccountComponent extends HomeComponent {
  protected accounts: Account[] = [];

  constructor(authenticationService: AuthenticationService, accountService: AccountService) {
    super(authenticationService, accountService);
  }
}
