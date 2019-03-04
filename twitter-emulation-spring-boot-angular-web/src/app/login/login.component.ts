import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent {
  credentials = {username: '', password: ''};
  error = false;
  logout = false;

  constructor(private auth: AuthenticationService, private router: Router, route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      this.logout = params["logout"] || false;
    });
  }

  login() {
    this.auth.authenticate(this.credentials, () => {
        this.router.navigateByUrl('/account/show');
      },
      () => {
        this.error = true;
        this.logout = false;
      });
    return false;
  }
}
