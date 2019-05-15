import { ActivatedRoute } from "@angular/router";
import { Observer } from "rxjs";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { User } from "../../shared/models/user.model";

export abstract class HomeChild {
  protected authenticatedUser: User = new User();
  protected title: string;

  protected constructor(private authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, observer: Observer<string>) {
    activatedRoute.params.subscribe(params => {
      const routeUserName = activatedRoute.snapshot.params['user'];
      console.log('routeUserName: ' + routeUserName + '; url: ' + activatedRoute.snapshot.url);

      this.authenticationService.getUser().subscribe(user => {
        this.authenticatedUser = user;
        let dataUserName = (routeUserName != null) ? routeUserName : this.authenticatedUser.name;
        console.log('dataUserName: ' + dataUserName);

        observer.next(dataUserName);
        this.getData(dataUserName);
      });
    });
  }

  getData(userName: string) {
  };
}
