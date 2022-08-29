import { Component } from 'react';
import { resolve } from 'inversify-react';
import Home from './Home';
import AccountList from './AccountList';
import { Account } from '../common/Account';
import { FollowerDataSource } from '../common/FollowerDataSource';
import ReactUtils from '../common/ReactUtils';

type FollowersProps = {
    params: any;
};

type FollowersState = {
    accounts: Account[];
};

class Followers extends Component<FollowersProps, FollowersState> {
    @resolve(FollowerDataSource)
    private readonly followerDataSource!: FollowerDataSource;

    constructor(props: FollowersProps) {
        super(props);

        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        let {user} = this.props.params;

        this.followerDataSource.getFollowers(user)
            .subscribe(response => {
                this.setState({accounts: response.data});
            });
    }

    render() {
        return (
            <Home>
                <AccountList title={'Followers'} accounts={this.state.accounts}></AccountList>
            </Home>
        );
    }
}

export default ReactUtils.withParams(Followers);
