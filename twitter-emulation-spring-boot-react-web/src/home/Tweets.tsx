import React, { Component } from 'react';
import { resolve } from 'inversify-react';
import { Tweet } from '../common/models/Tweet';
import Home from './Home';
import TweetList from './TweetList';
import ReactUtils from '../common/ReactUtils';
import { TweetDataSource } from '../common/datasources/TweetDataSource';

type TweetsProps = {
    params: any;
};

type TweetsState = {
    tweets: Tweet[];
};

class Tweets extends Component<TweetsProps, TweetsState> {
    @resolve(TweetDataSource)
    private readonly tweetDataSource!: TweetDataSource;

    constructor(props: TweetsProps) {
        super(props);

        this.state = {
            tweets: []
        };
    }

    componentDidMount() {
        const {user} = this.props.params;

        this.tweetDataSource.getTweets(user)
            .subscribe(response => {
                this.setState({
                    tweets: response.data
                });
            });
    }

    render() {
        const {user} = this.props.params;

        return (
            <Home username={user}>
                <TweetList title={'Tweets'} tweets={this.state.tweets}/>
            </Home>
        );
    }
}

export default ReactUtils.withParams(Tweets);
