import { Component } from 'react';
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
    private dataSource;

    constructor(props: MainProps) {
        super(props);

        this.dataSource = new TweetDataSource();
        this.state = {
            tweets: []
        };

        // TODO: change
        // this.state = {
        //     tweets: [
        //         new Tweet(
        //             0,
        //             'jdoe',
        //             'John Doe',
        //             'Some people care too much. I think it\'s called love.',
        //             new Date('2022-04-21T19:36:01')),
        //         new Tweet(
        //             1,
        //             'jsmith',
        //             'John Smith',
        //             'Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.',
        //             new Date('2022-04-21T19:36:01')),
        //         new Tweet(
        //             2,
        //             'jdoe',
        //             'John Doe',
        //             'You can\'t stay in your corner of the Forest waiting for others to come to you. You have to go to them sometimes.',
        //             new Date('2022-04-21T18:05:27'))
        //     ]
        // };
    }

    componentDidMount() {
        let {user} = this.props.params;

        this.dataSource.getTweets(user)
            .subscribe(response => {
                console.log('tweets: ' + JSON.stringify(response.data));
                // this.setState({tweets: response.data});
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
