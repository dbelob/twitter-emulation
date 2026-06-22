import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserState } from '../../shared/models/user-state.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, FormsModule]
})
export class TopBarComponent {
  @Input()
  userState: UserState;

  public searchText: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  search() {
    this.router.navigate(['/account/search'], {
      queryParams: {
        searchText: this.searchText
      }
    });
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authenticationService.logout(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          logout: 1
        }
      });
    });
  }
}
