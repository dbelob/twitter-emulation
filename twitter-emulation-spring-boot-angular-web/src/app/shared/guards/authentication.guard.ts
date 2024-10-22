import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authenticationCanActivate: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  return authenticationService.authenticate(undefined, undefined, () => {
    router.navigateByUrl('/login');
  });
};
