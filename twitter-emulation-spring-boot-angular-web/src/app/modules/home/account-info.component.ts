import { Component, Input } from '@angular/core';
import { AccountStatistics } from "../../shared/models/account-statistics.model";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html'
})
export class AccountInfoComponent {
  @Input('accountStatistics')
  accountStatistics: AccountStatistics;

  constructor() {
  }

  isFollowVisible(): boolean {
    // TODO: implement
    return false;
  }
}
