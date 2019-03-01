import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    this.app.authenticate(undefined, undefined, undefined, undefined);
  }

  ngOnInit() {
  }

  logout() {
    this.app.logout(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          "logout": true
        }
      });
    });
  }
}
