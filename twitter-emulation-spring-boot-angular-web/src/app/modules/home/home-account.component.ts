import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observer } from "rxjs";
import { Account } from "../../shared/models/account.model";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { DATA_USERNAME } from "../../shared/models/user.model";
import { HomeChild } from "./home-child";

@Component({
  selector: 'app-home-account',
  templateUrl: './home-account.component.html'
})
export class HomeAccountComponent extends HomeChild {
  protected accounts: Account[] = [];

  constructor(authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
              @Inject(DATA_USERNAME) observer: Observer<string>) {
    super(authenticationService, activatedRoute, router, observer);
  }
}
