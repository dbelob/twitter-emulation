import { Component } from 'react';
import { inject } from 'inversify-hooks';
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
    @inject() private readonly tweetService!: TweetService;

    constructor(props: TweetsProps) {
        super(props);

        this.state = {
            tweets: []
        };
    }

    componentDidMount() {
        const {user} = this.props.params;

        this.tweetService.getTweets(user)
            .then(response => {
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
