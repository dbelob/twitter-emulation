export class UserState {
    constructor(
        public authenticatedUserName?: string,
        public selectedUserName?: string
    ) {
    }

    getDataUserName(): string | undefined {
        return (this.selectedUserName) ? this.selectedUserName : this.authenticatedUserName;
    }

    isAuthenticated(): boolean {
        return (this.authenticatedUserName !== undefined);
    }
}
