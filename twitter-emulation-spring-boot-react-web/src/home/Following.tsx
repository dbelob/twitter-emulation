import { Component } from 'react';
import Home from './Home';
import { Account } from '../common/Account';
import AccountList from "./AccountList";

type FollowingProps = {};

type FollowingState = {
    accounts: Account[];
};

export default class Following extends Component<FollowingProps, FollowingState> {
    constructor(props: FollowingProps) {
        super(props);

        // TODO: change
        this.state = {
            accounts: [
                new Account(
                    1,
                    'jdoe',
                    'password',
                    'John Doe'),
                new Account(
                    2,
                    'rroe',
                    'password',
                    'Richard Roe'),
            ]
        };
    }

    render() {
        return (
            <Home>
                <AccountList title={'Following'} accounts={this.state.accounts}></AccountList>
            </Home>
        );
    }
}
