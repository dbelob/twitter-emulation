import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { User } from "../../shared/models/user.model";
import { Account } from "../../shared/models/account.model";
import { AccountStatistics } from "../../shared/models/account-statistics.model";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { AccountService } from "../../shared/services/account.service";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private routeUserName: string;
  protected authenticatedUser: User = new User();
  protected account: Account = new Account();
  protected accountStatistics: AccountStatistics = new AccountStatistics();
  protected title: string;

  constructor(private authenticationService: AuthenticationService, protected accountService: AccountService,
              activatedRoute: ActivatedRoute, router: Router) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        console.log('NavigationEnd');

        this.routeUserName = activatedRoute.snapshot.params['user'];
        console.log('routeUserName: ' + this.routeUserName + '; url: ' + activatedRoute.snapshot.url);

        this.authenticationService.getUser().subscribe(user => {
          this.authenticatedUser = user;
          let dataUserName = (this.routeUserName != null) ? this.routeUserName : this.authenticatedUser.name;

          this.accountService.getAccount(dataUserName).subscribe(data => {
            this.account = data;
          });

          this.accountService.getAccountStatistics(dataUserName).subscribe(data => {
            this.accountStatistics = data;
          });

          this.getData(dataUserName);
        });
      });
  }

  getData(userName: string) {
  };
}
