import { Component } from "react";

export interface AccountProps {
}

export interface AccountState {
}

export default class Account extends Component<AccountProps, AccountState> {
    constructor(props: AccountProps) {
        super(props);
    }

    render() {
        return (
            <div>Account</div>
        );
    }
}
