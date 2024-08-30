import { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import { Tweet } from '../common/models/Tweet';

type TweetListProps = {
    title?: string;
    tweets: Tweet[];
};

type TweetListState = {};

export default class TweetList extends Component<TweetListProps, TweetListState> {
    render() {
        return (
            <>
                {this.props.title && <h5 className="fw-bold">{this.props.title}</h5>}
                {this.props.tweets.map(tweet =>
                    <div className="card m-0 p-1 bg-light" key={tweet.id}>
                        <h6>
                            <Link to={`/account/show/${tweet.username}`} className="fw-bold">{tweet.description}</Link> @{tweet.username}
                            <span className="badge rounded-pill bg-primary float-end">
                                {tweet.date && format(tweet.date, 'dd.MM.yyyy HH:mm:ss')}
                            </span>
                        </h6>
                        <div className="card-text bg-white p-1 tweet">{tweet.text}</div>
                    </div>
                )}
            </>
        );
    }
}
