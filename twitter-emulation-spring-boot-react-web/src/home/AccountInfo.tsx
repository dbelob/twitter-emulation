import { Component } from 'react';
import { Link } from 'react-router-dom';
import { resolve } from 'inversify-react';
import { AccountStatistics } from '../common/models/AccountStatistics';
import { UserState } from '../common/models/UserState';
import { AccountService } from '../common/services/AccountService';

type AccountInfoProps = {
    userState: UserState;
};

type AccountInfoState = {
    accountStatistics: AccountStatistics;
};

export default class AccountInfo extends Component<AccountInfoProps, AccountInfoState> {
    @resolve(AccountService)
    private readonly accountService!: AccountService;

    constructor(props: AccountInfoProps) {
        super(props);

        this.state = {
            accountStatistics: new AccountStatistics()
        };
    }

    componentDidMount() {
        const username = this.props.userState.getDataUserName();

        if (username) {
            this.accountService.getAccountStatistics(username)
                .subscribe(data => {
                        this.setState({
                            accountStatistics: data
                        });
                    }
                );
        }
    }

    render() {
        return (
            <div className="card p-3 bg-light">
                <div className="row fw-bold">
                    <div className="col-12" id="description">
                        {this.state.accountStatistics.description}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12" id="username">
                        @{this.state.accountStatistics.username}
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-4 small">
                        <Link to={`/account/tweets/${this.state.accountStatistics.username}`} className="fw-bold">
                            Tweets
                        </Link>
                    </div>
                    <div className="col-4 small">
                        <Link to={`/account/following/${this.state.accountStatistics.username}`} className="fw-bold">
                            Following
                        </Link>
                    </div>
                    <div className="col-4 small">
                        <Link to={`/account/followers/${this.state.accountStatistics.username}`} className="fw-bold">
                            Followers
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 small">
                        <Link to={`/account/tweets/${this.state.accountStatistics.username}`} className="fw-bold">
                            {this.state.accountStatistics.tweetsCount}
                        </Link>
                    </div>
                    <div className="col-4 small">
                        <Link to={`/account/following/${this.state.accountStatistics.username}`} className="fw-bold">
                            {this.state.accountStatistics.followingCount}
                        </Link>
                    </div>
                    <div className="col-4 small">
                        <Link to={`/account/followers/${this.state.accountStatistics.username}`} className="fw-bold">
                            {this.state.accountStatistics.followersCount}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
