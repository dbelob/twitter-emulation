import { Component, Inject } from '@angular/core';
import { Observable } from "rxjs";
import { DATA_USERNAME } from "../../shared/models/user.model";
import { Account } from "../../shared/models/account.model";
import { AccountStatistics } from "../../shared/models/account-statistics.model";
import { AccountService } from "../../shared/services/account.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  protected account: Account = new Account();
  protected accountStatistics: AccountStatistics = new AccountStatistics();

  constructor(protected accountService: AccountService, @Inject(DATA_USERNAME) dataUserName: Observable<string>) {
    dataUserName.subscribe((userName) => {
      this.accountService.getAccount(userName).subscribe(data => {
        this.account = data;
      });

      this.accountService.getAccountStatistics(userName).subscribe(data => {
        this.accountStatistics = data;
      });
    });
  }
}
