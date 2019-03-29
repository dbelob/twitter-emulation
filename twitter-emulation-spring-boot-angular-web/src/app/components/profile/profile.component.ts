import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "../../models/account.model";
import { AuthenticationService } from "../../services/authentication.service";
import { AccountService } from "../../services/account.service";
import { ValidationService } from "../../services/validation.service";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  private formSubmitted: boolean = false;
  private credentials = {username: '', password: '', passwordConfirmation: '', description: ''};
  private user: User = new User();

  constructor(private authenticationService: AuthenticationService, private accountService: AccountService, private validationService: ValidationService, private router: Router) {
    authenticationService.getUser().subscribe(data => {
      this.user = data;

      accountService.getAccount(this.user.name).subscribe(data => {
        this.credentials.username = data.username;
        this.credentials.password = data.password;
        this.credentials.passwordConfirmation = data.password;
        this.credentials.description = data.description;
      });
    });
  }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      this.accountService.saveAccount(
        this.user.name,
        new Account(
          this.credentials.username,
          this.credentials.password,
          this.credentials.description)
      ).subscribe(data => {
        this.router.navigateByUrl('/account/show');
      });
    }
  }

  getFormValidationMessages(form: NgForm): string[] {
    return this.validationService.getFormValidationMessages(form);
  }
}
