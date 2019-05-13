import { Component, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observer } from "rxjs";
import { filter } from "rxjs/operators";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { DATA_USERNAME, User } from "../../shared/models/user.model";

@Component({
  selector: 'app-home-child',
  templateUrl: './home-child.component.html'
})
export class HomeChildComponent {
  protected authenticatedUser: User = new User();
  protected title: string;

  constructor(private authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
              @Inject(DATA_USERNAME) observer: Observer<string>) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        console.log('NavigationEnd');

        const routeUserName = activatedRoute.snapshot.params['user'];
        console.log('routeUserName: ' + routeUserName + '; url: ' + activatedRoute.snapshot.url);

        this.authenticationService.getUser().subscribe(user => {
          this.authenticatedUser = user;
          let dataUserName = (routeUserName != null) ? routeUserName : this.authenticatedUser.name;

          observer.next(dataUserName);
          this.getData(dataUserName);
        });
      });
  }

  getData(userName: string) {
  };
}
