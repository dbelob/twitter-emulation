import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserState } from "../../shared/models/user-state.model";
import { AuthenticationService } from "../../shared/services/authentication.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent implements OnInit {
  @Input('userState')
  userState: UserState;

  private searchText: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  search(form: NgForm) {
    this.router.navigate(['/account/search'], {
      queryParams: {
        "searchText": this.searchText
      }
    });
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authenticationService.logout(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          "logout": true
        }
      });
    });
  }
}
