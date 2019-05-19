import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent {
  private credentials = {username: '', password: ''};
  private error = false;
  private logout = false;

  constructor(private authenticationService: AuthenticationService, private router: Router, route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      this.logout = params["logout"] || false;
    });
  }

  login() {
    this.logout = false;

    this.authenticationService.authenticate(this.credentials, () => {
        this.router.navigate(['/account', 'show', this.credentials.username]);
      },
      () => {
        this.error = true;
      }).subscribe();
    return false;
  }
}
