import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observer } from "rxjs";
import { Tweet } from "../../shared/models/tweet.model";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { DATA_USERNAME } from "../../shared/models/user.model";
import { HomeChild } from "./home-child";

@Component({
  selector: 'app-home-tweets',
  templateUrl: './home-tweets.component.html'
})
export class HomeTweetsComponent extends HomeChild {
  protected tweets: Tweet[] = [];

  constructor(authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, @Inject(DATA_USERNAME) observer: Observer<string>) {
    super(authenticationService, activatedRoute, observer);
  }
}
