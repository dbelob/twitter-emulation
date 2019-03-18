import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent {
  credentials = {username: '', password: ''};
  error = false;
  logout = false;

  constructor(private authenticationService: AuthenticationService, private router: Router, route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      this.logout = params["logout"] || false;
    });
  }

  login() {
    this.logout = false;

    this.authenticationService.authenticate(this.credentials, () => {
        this.router.navigateByUrl('/account/show');
      },
      () => {
        this.error = true;
      }).subscribe();
    return false;
  }
}
