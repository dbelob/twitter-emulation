import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { AccountStatistics } from '../../shared/models/account-statistics.model';
import { AccountService } from '../../shared/services/account.service';

export const homeResolve: ResolveFn<AccountStatistics> = (route: ActivatedRouteSnapshot) => {
  const accountService = inject(AccountService);
  const dataUserName = route.params.user;

  return (dataUserName) ? accountService.getAccountStatistics(dataUserName) : of(new AccountStatistics());
};
