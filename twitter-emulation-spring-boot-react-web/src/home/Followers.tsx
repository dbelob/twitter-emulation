import React, { Component } from 'react';
import { resolve } from 'inversify-react';
import ReactUtils from '../common/ReactUtils';
import { Account } from '../common/models/Account';
import { FollowerService } from '../common/services/FollowerService';
import AccountList from './AccountList';
import Home from './Home';

type FollowersProps = {
    params: any;
};

type FollowersState = {
    accounts: Account[];
};

class Followers extends Component<FollowersProps, FollowersState> {
    @resolve(FollowerService)
    private readonly followerDataSource!: FollowerService;

    constructor(props: FollowersProps) {
        super(props);

        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        const {user} = this.props.params;

        this.followerDataSource.getFollowers(user)
            .subscribe(response => {
                this.setState({
                    accounts: response.data
                });
            });
    }

    render() {
        const {user} = this.props.params;

        return (
            <Home username={user}>
                <AccountList title={'Followers'} accounts={this.state.accounts}></AccountList>
            </Home>
        );
    }
}

export default ReactUtils.withParams(Followers);
