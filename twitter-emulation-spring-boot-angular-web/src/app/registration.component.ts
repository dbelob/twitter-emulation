import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  credentials = {username: '', password: '', confirmation: '', description: ''};

  constructor() {
  }

  ngOnInit() {
  }

  register() {
    //TODO: implement
  }
}
