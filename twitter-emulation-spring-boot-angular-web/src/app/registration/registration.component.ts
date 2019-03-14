import { Component, OnInit } from '@angular/core';
import { Account } from "../account";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  newAccount: Account = new Account();

  constructor() {
  }

  ngOnInit() {
  }

  register(account: Account) {
    //TODO: implement
    console.log("New Account: " + JSON.stringify(account));
  }
}
