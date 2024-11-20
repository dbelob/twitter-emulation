import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { HomeAccountComponent } from './home-account.component';
import { Observer } from 'rxjs';
import { AccountService } from '../../shared/services/account.service';
import { USER_STATE, UserState } from '../../shared/models/user-state.model';

@Component({
    selector: 'app-search',
    templateUrl: './home-account.component.html',
    standalone: false
})
export class SearchComponent extends HomeAccountComponent {
  constructor(authenticationService: AuthenticationService, private activatedRoute: ActivatedRoute, router: Router,
              @Inject(USER_STATE) observer: Observer<UserState>, private accountService: AccountService) {
    super(authenticationService, activatedRoute, router, observer);

    this.title = 'Search Result';
  }

  getData() {
    this.activatedRoute.queryParams.subscribe(params => {
      const searchText = params['searchText'];

      this.accountService.getAccounts(searchText)
        .subscribe(data => {
          this.accounts = data;
        });
    });
  }
}
