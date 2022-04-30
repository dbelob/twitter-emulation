import { Component } from 'react';
import { resolve } from 'inversify-react';
import Home from './Home';
import TweetList from './TweetList';
import { Tweet } from '../common/Tweet';
import ReactUtils from '../common/ReactUtils';
import { TweetDataSource } from '../common/TweetDataSource';

type MainProps = {
    params: any;
};

type MainState = {
    tweets: Tweet[];
};

class Main extends Component<MainProps, MainState> {
    @resolve(TweetDataSource)
    private readonly dataSource!: TweetDataSource;

    constructor(props: MainProps) {
        super(props);

        this.state = {
            tweets: []
        };
    }

    componentDidMount() {
        this.dataSource.getTimeline()
            .subscribe(response => {
                this.setState({tweets: response.data});
            });
    }

    render() {
        return (
            <Home>
                <TweetList tweets={this.state.tweets}/>
            </Home>
        );
    }
}

export default ReactUtils.withParams(Main);
