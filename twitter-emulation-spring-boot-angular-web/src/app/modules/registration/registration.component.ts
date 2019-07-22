import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "../../shared/models/account.model";
import { AccountService } from "../../shared/services/account.service";
import { ValidationService } from "../../shared/services/validation.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  private formSubmitted: boolean = false;
  private credentials = {username: '', password: '', passwordConfirmation: '', description: ''};

  constructor(private accountService: AccountService, private validationService: ValidationService, private router: Router) {
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      this.accountService.addAccount(
        new Account(
          this.credentials.username,
          this.credentials.password,
          this.credentials.description))
        .subscribe(data => {
          this.router.navigateByUrl('/login');
        });
    }
  }

  getFormValidationMessages(form: NgForm): string[] {
    return this.validationService.getFormValidationMessages(form);
  }
}
