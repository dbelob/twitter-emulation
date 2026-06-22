import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormsModule } from '@angular/forms';
import { AutofocusDirective } from '../general/autofocus.directive';

@Component({
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, AutofocusDirective, RouterLink]
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
