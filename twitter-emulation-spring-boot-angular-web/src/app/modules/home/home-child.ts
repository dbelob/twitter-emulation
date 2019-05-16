import { ActivatedRoute, Router } from "@angular/router";
import { Observer } from "rxjs";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { User } from "../../shared/models/user.model";
import { UserState } from "../../shared/models/user-state.model";

export abstract class HomeChild {
  protected authenticatedUser: User = new User();
  protected title: string;

  protected constructor(private authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
                        userStateObserver: Observer<UserState>) {
    activatedRoute.params.subscribe(params => {
      const selectedUserName = params['user'];
      const url = activatedRoute.snapshot.url;
      console.log('selectedUserName: ' + selectedUserName + '; url: ' + url); //TODO: delete

      this.authenticationService.getUser().subscribe(user => {
        this.authenticatedUser = user;

        if ((url[0].path === 'account') && (url[1].path === 'show')) {
          if (!selectedUserName) {
            router.navigate(['/account', 'show', this.authenticatedUser.name]);
            return;
          } else {
            if (selectedUserName !== this.authenticatedUser.name) {
              router.navigate(['/account', 'tweets', selectedUserName]);
              return;
            }
          }
        }

        const userState = new UserState(this.authenticatedUser.name, selectedUserName);
        console.log('dataUserName: ' + userState.getDataUserName());  //TODO: delete

        userStateObserver.next(userState);
        this.getData(userState.getDataUserName());
      });
    });
  }

  getData(userName: string) {
  };
}
