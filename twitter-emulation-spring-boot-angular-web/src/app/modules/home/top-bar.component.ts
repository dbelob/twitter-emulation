import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthenticationService } from "../../shared/services/authentication.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent implements OnInit {
  private searchText: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout(() => {
      this.router.navigateByUrl('/login', {
        queryParams: {
          "logout": true
        }
      });
    });
  }

  search(form: NgForm) {
    this.router.navigate(['/account/search'], {
      queryParams: {
        "searchText": this.searchText
      }
    });
  }
}
