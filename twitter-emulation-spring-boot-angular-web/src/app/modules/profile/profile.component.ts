import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../shared/models/account.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AccountService } from '../../shared/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  public formSubmitted = false;
  public credentials = {id: undefined, username: '', password: '', confirmation: '', description: ''};

  constructor(private authenticationService: AuthenticationService, private accountService: AccountService, private router: Router) {
    authenticationService.getUser()
      .subscribe(user => {
        accountService.getAccount(user.name)
          .subscribe(account => {
            this.credentials.id = account.id;
            this.credentials.username = account.username;
            this.credentials.password = account.password;
            this.credentials.confirmation = account.password;
            this.credentials.description = account.description;
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
