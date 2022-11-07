import { Component, Input } from '@angular/core';
import { UserState } from '../../shared/models/user-state.model';

@Component({
  selector: 'app-status-info',
  templateUrl: './status-info.component.html'
})
export class StatusInfoComponent {
  @Input('userState')
  userState: UserState;

  public copyrightDate = new Date();

  constructor() {
  }

  isStateVisible(): boolean {
    return this.userState.isAuthenticated();
  }
}
