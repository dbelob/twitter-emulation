import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AccountStatistics } from "../../shared/models/account-statistics.model";
import { AccountService } from "../../shared/services/account.service";
import { USER_STATE, UserState } from "../../shared/models/user-state.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public userState: UserState = new UserState();
  public accountStatistics: AccountStatistics = new AccountStatistics();

  constructor(protected accountService: AccountService, @Inject(USER_STATE) private userStateObservable: Observable<UserState>) {
  }

  ngOnInit(): void {
    this.userStateObservable.subscribe((userState) => {
      this.userState = userState;
      const dataUserName = userState.getDataUserName();

      this.accountService.getAccountStatistics(dataUserName)
        .subscribe(data => {
          this.accountStatistics = data;
        });
    });
  }
}
