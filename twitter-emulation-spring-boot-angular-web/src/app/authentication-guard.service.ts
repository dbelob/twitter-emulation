import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthenticationGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.auth.authenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
