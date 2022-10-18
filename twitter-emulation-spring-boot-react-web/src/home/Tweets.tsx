import React, { Component } from 'react';
import { resolve } from 'inversify-react';
import { Tweet } from '../common/models/Tweet';
import Home from './Home';
import TweetList from './TweetList';
import ReactUtils from '../common/ReactUtils';
import { TweetService } from '../common/services/TweetService';

type TweetsProps = {
    params: any;
};

type TweetsState = {
    tweets: Tweet[];
};

class Tweets extends Component<TweetsProps, TweetsState> {
    @resolve(TweetService)
    private readonly tweetDataSource!: TweetService;

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
