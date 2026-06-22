import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Account } from '../../shared/models/account.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AccountService } from '../../shared/services/account.service';
import { NonValidationMessageComponent } from '../message/non-validation-message.component';
import { ValidationMessagesComponent } from '../message/validation-messages.component';
import { EqualValidatorDirective } from '../general/equal-validator.directive';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, NonValidationMessageComponent, ValidationMessagesComponent, EqualValidatorDirective, RouterLink]
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
