import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observer } from "rxjs";
import { HomeChildComponent } from "./home-child.component";
import { Tweet } from "../../shared/models/tweet.model";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { DATA_USERNAME } from "../../shared/models/user.model";

@Component({
  selector: 'app-home-tweets',
  templateUrl: './home-tweets.component.html'
})
export class HomeTweetsComponent extends HomeChildComponent {
  protected tweets: Tweet[] = [];

  constructor(authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router, @Inject(DATA_USERNAME) observer: Observer<string>) {
    super(authenticationService, activatedRoute, router, observer);
  }
}
