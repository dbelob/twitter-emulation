import { Component } from '@angular/core';
import { AppService } from './app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent {
  credentials = {username: '', password: ''};
  error = false;
  logout = false;

  constructor(private app: AppService, private router: Router, route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      this.logout = params["logout"] || false;
    });
  }

  login() {
    this.app.authenticate(this.credentials, () => {
        this.router.navigateByUrl('/account/show');
      },
      () => {
        this.error = true;
        this.logout = false;
      },
      undefined);
    return false;
  }
}
