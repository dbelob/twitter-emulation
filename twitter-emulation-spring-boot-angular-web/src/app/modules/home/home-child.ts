import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observer } from 'rxjs';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserState } from '../../shared/models/user-state.model';

export abstract class HomeChild {
  public title: string;

  protected constructor(private authenticationService: AuthenticationService, activatedRoute: ActivatedRoute, private router: Router,
                        private userStateObserver: Observer<UserState>) {
    activatedRoute.params.subscribe(params => {
      const selectedUserName = params['user'];
      const url = activatedRoute.snapshot.url;

      this.authenticationService.getUser()
        .subscribe(authenticatedUser => {
          this.apply(url, authenticatedUser?.name, selectedUserName);
        });
    });
  }

  apply(url: UrlSegment[], authenticatedUserName: string, selectedUserName: string) {
    if ((url[0].path === 'account') && (url[1].path === 'show')) {
      if (!selectedUserName) {
        if (authenticatedUserName) {
          this.router.navigate(['/account', 'show', authenticatedUserName]);
          return;
        }
      } else {
        if (selectedUserName !== authenticatedUserName) {
          this.router.navigate(['/account', 'tweets', selectedUserName]);
          return;
        }
      }
    }

    const userState = new UserState(authenticatedUserName, selectedUserName);

    this.userStateObserver.next(userState);
    this.getData(userState.getDataUserName());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getData(username: string) {
    // Nothing
  }
}
