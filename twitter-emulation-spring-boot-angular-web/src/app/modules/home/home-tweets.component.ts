import { Component } from '@angular/core';
import { HomeComponent } from "./home.component";
import { Tweet } from "../../shared/models/tweet.model";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { AccountService } from "../../shared/services/account.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home-tweets',
  templateUrl: './home-tweets.component.html'
})
export class HomeTweetsComponent extends HomeComponent {
  protected tweets: Tweet[] = [];

  constructor(authenticationService: AuthenticationService, accountService: AccountService, activatedRoute: ActivatedRoute) {
    super(authenticationService, accountService, activatedRoute);
  }
}
