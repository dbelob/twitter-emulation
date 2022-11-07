import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountStatistics } from '../../shared/models/account-statistics.model';
import { AccountService } from '../../shared/services/account.service';

@Injectable()
export class HomeResolver implements Resolve<AccountStatistics> {
  constructor(private accountService: AccountService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccountStatistics> {
    const dataUserName = route.params['user'];

    return (dataUserName) ? this.accountService.getAccountStatistics(dataUserName) : undefined;
  }
}
