import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
    templateUrl: './login.component.html',
    standalone: false
})

export class LoginComponent {
  public credentials = {username: '', password: ''};
  public error = false;
  public logout = false;

  constructor(private authenticationService: AuthenticationService, private router: Router, route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      this.logout = (params.logout === '1');
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
