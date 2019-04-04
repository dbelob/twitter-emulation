import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent implements OnInit {
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

  search() {
    //TODO: implement
  }
}
