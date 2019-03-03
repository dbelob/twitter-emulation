import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  credentials = {username: '', password: '', confirmation: '', description: ''};

  constructor() {
  }

  ngOnInit() {
  }

  save() {
    //TODO: implement
  }
}
