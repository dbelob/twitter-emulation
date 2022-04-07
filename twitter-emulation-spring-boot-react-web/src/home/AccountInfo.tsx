import { Component } from "react";

export interface AccountInfoProps {
}

export interface AccountInfoState {
}

export default class AccountInfo extends Component<AccountInfoProps, AccountInfoState> {
    constructor(props: AccountInfoProps) {
        super(props);
    }

    render() {
        return (
            <div>Account Info</div>
        );
    }
}
