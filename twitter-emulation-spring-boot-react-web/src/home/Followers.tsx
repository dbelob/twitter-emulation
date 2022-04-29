import { Component } from 'react';
import Home from './Home';
import { Account } from '../common/Account';
import AccountList from "./AccountList";

type FollowersProps = {};

type FollowersState = {
    accounts: Account[];
};

export default class Followers extends Component<FollowersProps, FollowersState> {
    constructor(props: FollowersProps) {
        super(props);

        // TODO: change
        this.state = {
            accounts: [
                new Account(
                    1,
                    'jdoe',
                    'password',
                    'John Doe')
            ]
        };
    }

    render() {
        return (
            <Home>
                <AccountList title={'Followers'} accounts={this.state.accounts}></AccountList>
            </Home>
        );
    }
}
