import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

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
      this.router.navigate(['/login'], {
        queryParams: {
          "logout": true
        }
      });
    });
  }

  search(form: NgForm) {
    this.router.navigate(['/account/search'], {
      queryParams: {
        "text": this.searchText
      }
    });
  }
}
