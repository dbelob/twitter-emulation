import { Component, Inject, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Observer, Subject } from "rxjs";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { TweetService } from "../../shared/services/tweet.service";
import { HomeTweetsComponent } from "./home-tweets.component";
import { USER_STATE, UserState } from "../../shared/models/user-state.model";
import { HomeComponent } from "./home.component";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-account",
  templateUrl: "./home-tweets.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [HomeComponent, RouterLink, DatePipe],
  providers: [{ provide: USER_STATE, useValue: new Subject<UserState>() }],
})
export class AccountComponent extends HomeTweetsComponent {
  constructor(
    authenticationService: AuthenticationService,
    activatedRoute: ActivatedRoute,
    router: Router,
    @Inject(USER_STATE) observer: Observer<UserState>,
    private tweetService: TweetService,
  ) {
    super(authenticationService, activatedRoute, router, observer);
  }

  getData() {
    this.tweetService.getTimeline().subscribe((data) => {
      this.tweets = data;
    });
  }
}
