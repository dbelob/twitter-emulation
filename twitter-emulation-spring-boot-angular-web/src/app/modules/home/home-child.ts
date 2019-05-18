import { ActivatedRoute, Router } from "@angular/router";
import { Observer } from "rxjs";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { UserState } from "../../shared/models/user-state.model";

export abstract class HomeChild {
  protected title: string;

  protected constructor(private authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, router: Router,
                        userStateObserver: Observer<UserState>) {
    activatedRoute.params.subscribe(params => {
      const selectedUserName = params['user'];
      const url = activatedRoute.snapshot.url;

      this.authenticationService.authenticate(undefined, () => {
          this.authenticationService.getUser().subscribe(authenticatedUser => {
            if ((url[0].path === 'account') && (url[1].path === 'show')) {
              if (!selectedUserName) {
                router.navigate(['/account', 'show', authenticatedUser.name]);
                return;
              } else {
                if (selectedUserName !== authenticatedUser.name) {
                  router.navigate(['/account', 'tweets', selectedUserName]);
                  return;
                }
              }
            }

            const userState = new UserState(authenticatedUser.name, selectedUserName);

            userStateObserver.next(userState);
            this.getData(userState.getDataUserName());
          });
        },
        () => {
          if ((url[0].path === 'account') && (url[1].path === 'show')) {
            router.navigate(['/account', 'tweets', selectedUserName]);
            return;
          }

          const userState = new UserState(undefined, selectedUserName);

          userStateObserver.next(userState);
          this.getData(userState.getDataUserName());
        }).subscribe();
    });
  }

  getData(userName: string) {
  };
}
