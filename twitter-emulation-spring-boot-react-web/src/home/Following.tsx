import React, { Component } from 'react';
import { resolve } from 'inversify-react';
import ReactUtils from '../common/ReactUtils';
import { Account } from '../common/models/Account';
import { FollowerService } from '../common/services/FollowerService';
import AccountList from './AccountList';
import Home from './Home';

type FollowingProps = {
    params: any;
};

type FollowingState = {
    accounts: Account[];
};

class Following extends Component<FollowingProps, FollowingState> {
    @resolve(FollowerService)
    private readonly followerDataSource!: FollowerService;

    constructor(props: FollowingProps) {
        super(props);

        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        const {user} = this.props.params;

        this.followerDataSource.getFollowing(user)
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
                <AccountList title={'Following'} accounts={this.state.accounts}></AccountList>
            </Home>
        );
    }
}

export default ReactUtils.withParams(Following);
