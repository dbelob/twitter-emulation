import { Component, OnInit } from '@angular/core';
import { Account } from "../account";
import { NgForm } from "@angular/forms";
import { AccountService } from "../account.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  formSubmitted: boolean = false;
  newAccount: Account = new Account();

  constructor(private account: AccountService, private router: Router) {
  }

  ngOnInit() {
  }

  register(account: Account) {
    //TODO: implement
    this.account.register(account, () => {
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

  getValidationMessages(state: any, thingName?: string) {
    let thing: string = state.path || thingName;
    let messages: string[] = [];

    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case "required":
            messages.push(`You must enter a ${thing}`);
            break;
          case "minlength":
            messages.push(`A ${thing} must be at least ${state.errors['minlength'].requiredLength} characters`);
            break;
          case "maxlength":
            messages.push(`A ${thing} must be no more than ${state.errors['maxlength'].requiredLength} characters`);
            break;
          case "pattern":
            messages.push(`The ${thing} contains illegal characters`);
            break;
          case "validateEqual":
            messages.push(`A ${state.errors['validateEqual'].validated} and ${thing} must be the same`);
            break;
        }
      }
    }

    return messages;
  }

  getFormValidationMessages(form: NgForm): string[] {
    let messages: string[] = [];

    Object.keys(form.controls).forEach(k => {
      this.getValidationMessages(form.controls[k], k)
        .forEach(m => messages.push(m));
    });

    return messages;
  }
}
