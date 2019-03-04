import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.auth.authenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
