import React, { Component } from 'react';
import { resolve } from 'inversify-react';
import { Account } from '../common/models/Account';
import { AccountDataSource } from '../common/datasources/AccountDataSource';
import Home from './Home';
import AccountList from './AccountList';
import { UserState } from '../common/models/UserState';
import { AuthenticationDataSource } from '../common/datasources/AuthenticationDataSource';

type SearchProps = {};

type SearchState = {
    userState?: UserState;
    accounts: Account[];
};

export default class Search extends Component<SearchProps, SearchState> {
    @resolve(AuthenticationDataSource)
    private readonly authenticationDataSource!: AuthenticationDataSource;

    @resolve(AccountDataSource)
    private readonly accountDataSource!: AccountDataSource;

    constructor(props: SearchProps) {
        super(props);

        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        this.authenticationDataSource.getUser()
            .subscribe(response => {
                this.getData(response?.name);
            });
    }

    getData(authenticatedUserName?: string) {
        // TODO: implement
        this.setState({
            userState: new UserState(authenticatedUserName, authenticatedUserName),
            // accounts: response.data
        });
    }

    // TODO: implement
    render() {
        return (
            <>
                {
                    (this.state.userState) ?
                        <Home userState={this.state.userState}>
                            <AccountList title={'Search Result'} accounts={this.state.accounts}></AccountList>
                        </Home> :
                        <div className="text-center">
                            Loading...
                        </div>
                }
            </>
        );
    }
}
