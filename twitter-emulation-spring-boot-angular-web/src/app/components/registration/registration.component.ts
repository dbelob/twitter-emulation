import { Component, OnInit } from '@angular/core';
import { Account } from "../../models/account.model";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "../../services/account.service";
import { ValidationService } from "../../services/validation.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  formSubmitted: boolean = false;
  credentials = {username: '', password: '', passwordConfirmation: '', description: ''};

  constructor(private accountService: AccountService, private validationService: ValidationService, private router: Router) {
  }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      this.accountService.register(
        new Account(
          this.credentials.username,
          this.credentials.password,
          this.credentials.description)
      ).subscribe(data => {
        this.router.navigateByUrl('/login');
      });
    }
  }

  getFormValidationMessages(form: NgForm): string[] {
    return this.validationService.getFormValidationMessages(form);
  }
}
