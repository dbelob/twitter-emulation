import { Component } from "react";
import Home from "./Home";

type AccountProps = {};

type AccountState = {};

export default class Account extends Component<AccountProps, AccountState> {
    render() {
        return (
            <Home>
                <div>Account</div>
            </Home>
        );
    }
}
