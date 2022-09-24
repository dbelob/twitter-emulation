import { Component } from 'react';
import { resolve } from 'inversify-react';
import Home from './Home';
import AccountList from './AccountList';
import { Account } from '../common/models/Account';
import { FollowerDataSource } from '../common/datasources/FollowerDataSource';
import ReactUtils from '../common/ReactUtils';

type FollowingProps = {
    params: any;
};

type FollowingState = {
    accounts: Account[];
};

class Following extends Component<FollowingProps, FollowingState> {
    @resolve(FollowerDataSource)
    private readonly followerDataSource!: FollowerDataSource;

    constructor(props: FollowingProps) {
        super(props);

        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        let {user} = this.props.params;

        this.followerDataSource.getFollowing(user)
            .subscribe(response => {
                this.setState({accounts: response.data});
            });
    }

    render() {
        return (
            <Home>
                <AccountList title={'Following'} accounts={this.state.accounts}></AccountList>
            </Home>
        );
    }
}

export default ReactUtils.withParams(Following);
