import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Account } from '../../shared/models/account.model';
import { AccountService } from '../../shared/services/account.service';
import { NonValidationMessageComponent } from '../message/non-validation-message.component';
import { ValidationMessagesComponent } from '../message/validation-messages.component';
import { AutofocusDirective } from '../general/autofocus.directive';
import { EqualValidatorDirective } from '../general/equal-validator.directive';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, NonValidationMessageComponent, ValidationMessagesComponent, AutofocusDirective, EqualValidatorDirective, RouterLink]
})
export class RegistrationComponent {
  public formSubmitted = false;
  public credentials = {id: undefined, username: '', password: '', confirmation: '', description: ''};

  constructor(private accountService: AccountService, private router: Router) {
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      this.accountService.addAccount(
        new Account(
          this.credentials.id,
          this.credentials.username,
          this.credentials.password,
          this.credentials.description))
        .subscribe(() => {
          this.router.navigateByUrl('/login');
        });
    }
  }
}
