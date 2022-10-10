import React, { Component } from 'react';
import { resolve } from 'inversify-react';
import Home from './Home';
import AccountList from './AccountList';
import { Account } from '../common/models/Account';
import ReactUtils from '../common/ReactUtils';
import { UserState } from '../common/models/UserState';
import { AuthenticationDataSource } from '../common/datasources/AuthenticationDataSource';
import { FollowerDataSource } from '../common/datasources/FollowerDataSource';

type FollowingProps = {
    params: any;
};

type FollowingState = {
    userState?: UserState;
    accounts: Account[];
};

class Following extends Component<FollowingProps, FollowingState> {
    @resolve(AuthenticationDataSource)
    private readonly authenticationDataSource!: AuthenticationDataSource;

    @resolve(FollowerDataSource)
    private readonly followerDataSource!: FollowerDataSource;

    constructor(props: FollowingProps) {
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
        const {user} = this.props.params;

        this.followerDataSource.getFollowing(user)
            .subscribe(response => {
                this.setState({
                    userState: new UserState(authenticatedUserName, user),
                    accounts: response.data
                });
            });
    }

    render() {
        return (
            <>
                {
                    (this.state.userState) ?
                        <Home>
                            <AccountList title={'Following'} accounts={this.state.accounts}></AccountList>
                        </Home> :
                        <div className="text-center">
                            Loading...
                        </div>
                }
            </>
        );
    }
}

export default ReactUtils.withParams(Following);
