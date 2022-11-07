import { InjectionToken } from '@angular/core';

export class UserState {
  constructor(
    public authenticatedUserName?: string,
    public selectedUserName?: string
  ) {
  }

  getDataUserName(): string {
    return (this.selectedUserName) ? this.selectedUserName : this.authenticatedUserName;
  }

  isAuthenticated(): boolean {
    return (this.authenticatedUserName !== undefined);
  }
}

export const USER_STATE = new InjectionToken("user_state");
