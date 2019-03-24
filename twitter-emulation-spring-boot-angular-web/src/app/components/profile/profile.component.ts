import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ValidationService } from "../../services/validation.service";
import { Account } from "../../models/account.model";
import { AccountService } from "../../services/account.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  formSubmitted: boolean = false;
  credentials = {username: '', password: '', passwordConfirmation: '', description: ''};

  constructor(private accountService: AccountService, private validationService: ValidationService, private router: Router) {
    accountService.loadProfile().subscribe(data => {
      this.credentials.username = data.username;
      this.credentials.password = data.password;
      this.credentials.passwordConfirmation = data.password;
      this.credentials.description = data.description;
    });
  }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      this.accountService.saveProfile(
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
