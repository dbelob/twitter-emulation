import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
import { AuthenticationService } from "../../services/authentication.service";
import { AccountService } from "../../services/account.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html'
})
export class DeleteAccountComponent implements OnInit {
  private user: User = new User();

  constructor(private authenticationService: AuthenticationService, private accountService: AccountService, private router: Router) {
    authenticationService.getUser().subscribe(data => {
      this.user = data;
    });
  }

  ngOnInit() {
  }

  delete() {
    this.accountService.deleteAccount(this.user.name)
      .subscribe(data => {
        this.router.navigate(['/login'], {
          queryParams: {
            "logout": true
          }
        });
      });
  }
}
