import React, { Component } from 'react';
import { resolve } from 'inversify-react';
import { Tweet } from '../common/models/Tweet';
import Home from './Home';
import TweetList from './TweetList';
import ReactUtils from '../common/ReactUtils';
import { UserState } from "../common/models/UserState";
import { TweetDataSource } from '../common/datasources/TweetDataSource';
import { AuthenticationDataSource } from '../common/datasources/AuthenticationDataSource';

type TweetsProps = {
    params: any;
};

type TweetsState = {
    userState?: UserState;
    tweets: Tweet[];
};

class Tweets extends Component<TweetsProps, TweetsState> {
    @resolve(AuthenticationDataSource)
    private readonly authenticationDataSource!: AuthenticationDataSource;

    @resolve(TweetDataSource)
    private readonly tweetDataSource!: TweetDataSource;

    constructor(props: TweetsProps) {
        super(props);

        this.state = {
            tweets: []
        };
    }

    componentDidMount() {
        this.authenticationDataSource.getUser()
            .subscribe(response => {
                this.getData(response?.name);
            });
    }

    getData(authenticatedUserName?: string) {
        const {user} = this.props.params;

        this.tweetDataSource.getTweets(user)
            .subscribe(response => {
                this.setState({
                    userState: new UserState(authenticatedUserName, user),
                    tweets: response.data
                });
            });
    }

    render() {
        return (
            <>
                {
                    (this.state.userState) ?
                        <Home>
                            <TweetList title={'Tweets'} tweets={this.state.tweets}/>
                        </Home> :
                        <div className="text-center">
                            Loading...
                        </div>
                }
            </>
        );
    }
}

export default ReactUtils.withParams(Tweets);
