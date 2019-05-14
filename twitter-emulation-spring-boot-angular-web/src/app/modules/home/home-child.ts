import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observer } from "rxjs";
import { filter } from "rxjs/operators";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { User } from "../../shared/models/user.model";

export abstract class HomeChild {
  protected authenticatedUser: User = new User();
  protected title: string;

  protected constructor(private authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
                        observer: Observer<string>) {
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
