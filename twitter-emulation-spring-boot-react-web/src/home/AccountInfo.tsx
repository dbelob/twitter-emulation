import { Component } from "react";
import { Link } from "react-router-dom";

type AccountInfoProps = {};

type AccountInfoState = {};

export default class AccountInfo extends Component<AccountInfoProps, AccountInfoState> {
    render() {
        return (
            <div className="card p-3 bg-light">
                <div className="row fw-bold">
                    <div className="col-12" id="description">
                        John Smith
                    </div>
                </div>
                <div className="row">
                    <div className="col-12" id="username">
                        @jsmith
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-4 small">
                        <Link to="/account/tweets/jsmith" className="fw-bold">
                            Tweets
                        </Link>
                    </div>
                    <div className="col-4 small">
                        <Link to="/account/following/jsmith" className="fw-bold">
                            Following
                        </Link>
                    </div>
                    <div className="col-4 small">
                        <Link to="/account/followers/jsmith" className="fw-bold">
                            Followers
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 small">
                        <Link to="/account/tweets/jsmith" className="fw-bold">
                            6
                        </Link>
                    </div>
                    <div className="col-4 small">
                        <Link to="/account/following/jsmith" className="fw-bold">
                            2
                        </Link>
                    </div>
                    <div className="col-4 small">
                        <Link to="/account/followers/jsmith" className="fw-bold">
                            1
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
