import { Component, OnInit } from '@angular/core';
import { Account } from "../account";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  formSubmitted: boolean = false;
  newAccount: Account = new Account();

  constructor() {
  }

  ngOnInit() {
  }

  register(account: Account) {
    //TODO: implement
    console.log("New Account: " + JSON.stringify(account));
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
}
