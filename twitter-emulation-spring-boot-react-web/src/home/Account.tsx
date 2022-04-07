import { Component } from "react";
import Home from "./Home";

export interface AccountProps {
}

export interface AccountState {
}

export default class Account extends Component<AccountProps, AccountState> {
    render() {
        return (
            <Home>
                <div>Account</div>
            </Home>
        );
    }
}
