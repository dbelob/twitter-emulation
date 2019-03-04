import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  constructor(private auth: AuthenticationService, private http: HttpClient, private router: Router) {
    // this.auth.authenticate(undefined, undefined, undefined);
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          "logout": true
        }
      });
    });
  }
}
