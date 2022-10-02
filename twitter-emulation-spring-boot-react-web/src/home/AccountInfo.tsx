import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AccountStatistics } from '../common/models/AccountStatistics';
import { UserState } from '../common/models/UserState';

type AccountInfoProps = {
    userState: UserState;
    accountStatistics: AccountStatistics;
};

type AccountInfoState = {};

export default class AccountInfo extends Component<AccountInfoProps, AccountInfoState> {
    render() {
        return (
            <div className="card p-3 bg-light">
                <div className="row fw-bold">
                    <div className="col-12" id="description">
                        {this.props.accountStatistics.description}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12" id="username">
                        @{this.props.accountStatistics.username}
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-4 small">
                        <Link to={`/account/tweets/${this.props.accountStatistics.username}`} className="fw-bold">
                            Tweets
                        </Link>
                    </div>
                    <div className="col-4 small">
                        <Link to={`/account/following/${this.props.accountStatistics.username}`} className="fw-bold">
                            Following
                        </Link>
                    </div>
                    <div className="col-4 small">
                        <Link to={`/account/followers/${this.props.accountStatistics.username}`} className="fw-bold">
                            Followers
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 small">
                        <Link to={`/account/tweets/${this.props.accountStatistics.username}`} className="fw-bold">
                            {this.props.accountStatistics.tweetsCount}
                        </Link>
                    </div>
                    <div className="col-4 small">
                        <Link to={`/account/following/${this.props.accountStatistics.username}`} className="fw-bold">
                            {this.props.accountStatistics.followingCount}
                        </Link>
                    </div>
                    <div className="col-4 small">
                        <Link to={`/account/followers/${this.props.accountStatistics.username}`} className="fw-bold">
                            {this.props.accountStatistics.followersCount}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
