import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { AccountStatistics } from '../../shared/models/account-statistics.model';
import { AccountService } from '../../shared/services/account.service';

export const homeResolve: ResolveFn<AccountStatistics> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const accountService = inject(AccountService);
  const dataUserName = route.params.user;

  return (dataUserName) ? accountService.getAccountStatistics(dataUserName) : undefined;
};
