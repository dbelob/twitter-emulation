import React, { Component } from 'react';
import { resolve } from 'inversify-react';
import Home from './Home';
import TweetList from './TweetList';
import { Tweet } from '../common/models/Tweet';
import ReactUtils from '../common/ReactUtils';
import { UserState } from '../common/models/UserState';
import { AuthenticationDataSource } from '../common/datasources/AuthenticationDataSource';
import { TweetDataSource } from '../common/datasources/TweetDataSource';

type MainProps = {
    params: any;
};

type MainState = {
    userState?: UserState;
    tweets: Tweet[];
};

class Main extends Component<MainProps, MainState> {
    @resolve(AuthenticationDataSource)
    private readonly authenticationDataSource!: AuthenticationDataSource;

    @resolve(TweetDataSource)
    private readonly tweetDataSource!: TweetDataSource;

    constructor(props: MainProps) {
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

        this.tweetDataSource.getTimeline()
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
                        <Home userState={this.state.userState}>
                            <TweetList tweets={this.state.tweets}/>
                        </Home> :
                        <div className="text-center">
                            Loading...
                        </div>
                }
            </>
        );
    }
}

export default ReactUtils.withParams(Main);
