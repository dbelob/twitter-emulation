import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authenticationCanActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  return authenticationService.authenticate(undefined, undefined, () => {
    router.navigateByUrl('/login');
  });
};
