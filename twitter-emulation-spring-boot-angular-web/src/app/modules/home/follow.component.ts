import { Component, Input } from '@angular/core';
import { UserState } from "../../shared/models/user-state.model";

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html'
})
export class FollowComponent {
  @Input('userState')
  userState: UserState;

  public copyrightDate = new Date();

  constructor() {
  }

  isStateVisible(): boolean {
    return this.userState.isAuthenticated();
  }
}
