import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../shared/models/account.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AccountService } from '../../shared/services/account.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProfileComponent {
  public formSubmitted = false;
  public credentials = {id: undefined, username: '', password: '', confirmation: '', description: ''};

  constructor(private authenticationService: AuthenticationService, private accountService: AccountService, private router: Router) {
    authenticationService.getUser()
      .subscribe(user => {
        accountService.getAccount(user.name!)
          .subscribe(account => {
            this.credentials.id = account.id as undefined;
            this.credentials.username = account.username as string;
            this.credentials.password = account.password as string;
            this.credentials.confirmation = account.password as string;
            this.credentials.description = account.description as string;
          });
      });
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      this.accountService.saveAccount(
        this.credentials.username,
        new Account(
          this.credentials.id,
          this.credentials.username,
          this.credentials.password,
          this.credentials.description))
        .subscribe(() => {
          this.router.navigate(['/account', 'show', this.credentials.username]);
        });
    }
  }
}
