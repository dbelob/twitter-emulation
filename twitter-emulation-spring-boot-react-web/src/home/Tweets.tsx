import React, { Component } from 'react';
import { format } from 'date-fns'
import { Tweet } from '../common/Tweet';
import { Link } from "react-router-dom";

type TweetsProps = {
    tweets: Tweet[];
};

type TweetsState = {};

export default class Tweets extends Component<TweetsProps, TweetsState> {
    render() {
        return (
            this.props.tweets.map(tweet =>
                <div className="card m-0 p-1 bg-light">
                    <h6>
                        <Link to={`/account/show/${tweet.username}`} className="fw-bold">{tweet.description}</Link> @{tweet.username}
                        <span className="badge rounded-pill bg-primary float-end">
                            {(tweet.date) ? format(tweet.date, 'dd.MM.yyyy HH:mm:ss') : null}
                        </span>
                    </h6>
                    <div className="card-text bg-white p-1">{tweet.text}</div>
                </div>
            )
        );
    }
}
