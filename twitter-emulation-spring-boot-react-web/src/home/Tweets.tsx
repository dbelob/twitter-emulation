import { Component } from 'react';
import { resolve } from 'inversify-react';
import { Tweet } from '../common/Tweet';
import Home from './Home';
import TweetList from './TweetList';
import { TweetDataSource } from '../common/TweetDataSource';
import ReactUtils from '../common/ReactUtils';

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
        let {user} = this.props.params;

        this.tweetDataSource.getTweets(user)
            .subscribe(response => {
                this.setState({tweets: response.data});
            });
    }

    render() {
        return (
            <Home>
                <TweetList title={'Tweets'} tweets={this.state.tweets}/>
            </Home>
        );
    }
}

export default ReactUtils.withParams(Tweets);
