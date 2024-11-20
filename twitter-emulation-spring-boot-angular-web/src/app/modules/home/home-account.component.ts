import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { Account } from '../../shared/models/account.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { HomeChild } from './home-child';
import { USER_STATE, UserState } from '../../shared/models/user-state.model';

@Component({
    selector: 'app-home-account',
    templateUrl: './home-account.component.html',
    standalone: false
})
export class HomeAccountComponent extends HomeChild {
  public accounts: Account[] = [];

  constructor(authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
              @Inject(USER_STATE) observer: Observer<UserState>) {
    super(authenticationService, activatedRoute, router, observer);
  }
}
