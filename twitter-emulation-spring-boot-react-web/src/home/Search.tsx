import { Component } from 'react';
import { resolve } from 'inversify-react';
import { Account } from '../common/models/Account';
import { AccountDataSource } from '../common/datasources/AccountDataSource';
import Home from "./Home";
import AccountList from "./AccountList";

type SearchProps = {};

type SearchState = {
    accounts: Account[];
};

export default class Search extends Component<SearchProps, SearchState> {
    @resolve(AccountDataSource)
    private readonly accountDataSource!: AccountDataSource;

    constructor(props: SearchProps) {
        super(props);

        this.state = {
            accounts: []
        };
    }

    // TODO: implement
    render() {
        return (
            <Home>
                <AccountList title={'Search Result'} accounts={this.state.accounts}></AccountList>
            </Home>
        );
    }
}
