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
  newAccount: Account = new Account();

  constructor(private accountService: AccountService, private validationService: ValidationService, private router: Router) {
  }

  ngOnInit() {
  }

  register(account: Account) {
    //TODO: implement
    this.accountService.register(account, () => {
      this.router.navigateByUrl('/login');
    });
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      this.register(this.newAccount);
      this.newAccount = new Account();
      form.reset();
      this.formSubmitted = false;
    }
  }

  getFormValidationMessages(form: NgForm): string[] {
    return this.validationService.getFormValidationMessages(form);
  }
}
