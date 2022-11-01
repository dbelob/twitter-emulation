import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "../../shared/models/account.model";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { AccountService } from "../../shared/services/account.service";
import { ValidationService } from "../../shared/services/validation.service";
import { User } from "../../shared/models/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  public formSubmitted: boolean = false;
  public credentials = {id: undefined, username: '', password: '', confirmation: '', description: ''};
  private user: User = new User();

  constructor(private authenticationService: AuthenticationService, private accountService: AccountService, private validationService: ValidationService, private router: Router) {
    authenticationService.getUser()
      .subscribe(data => {
        this.user = data;

        accountService.getAccount(this.user.name)
          .subscribe(data => {
            this.credentials.id = data.id;
            this.credentials.username = data.username;
            this.credentials.password = data.password;
            this.credentials.confirmation = data.password;
            this.credentials.description = data.description;
          });
      });
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      this.accountService.saveAccount(
        this.user.name,
        new Account(
          this.credentials.id,
          this.credentials.username,
          this.credentials.password,
          this.credentials.description))
        .subscribe(data => {
          this.router.navigate(['/account', 'show', this.credentials.username]);
        });
    }
  }

  getFormValidationMessages(form: NgForm): string[] {
    return this.validationService.getFormValidationMessages(form);
  }
}
