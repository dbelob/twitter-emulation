import { ActivatedRoute, Router } from "@angular/router";
import { Observer } from "rxjs";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { User } from "../../shared/models/user.model";

export abstract class HomeChild {
  protected authenticatedUser: User = new User();
  protected title: string;

  protected constructor(private authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
                        observer: Observer<string>) {
    activatedRoute.params.subscribe(params => {
      const routeUserName = params['user'];
      const url = activatedRoute.snapshot.url;
      console.log('routeUserName: ' + routeUserName + '; url: ' + url); //TODO: delete

      this.authenticationService.getUser().subscribe(user => {
        this.authenticatedUser = user;

        if ((url[0].path === 'account') && (url[1].path === 'show')) {
          if (routeUserName == null) {
            router.navigate(['/account', 'show', this.authenticatedUser.name]);
            return;
          } else {
            if (routeUserName !== this.authenticatedUser.name) {
              router.navigate(['/account', 'tweets', routeUserName]);
              return;
            }
          }
        }

        let dataUserName = (routeUserName != null) ? routeUserName : this.authenticatedUser.name;
        console.log('dataUserName: ' + dataUserName);                   //TODO: delete

        observer.next(dataUserName);
        this.getData(dataUserName);
      });
    });
  }

  getData(userName: string) {
  };
}
