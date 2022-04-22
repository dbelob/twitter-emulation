import { Component } from 'react';
import { Tweet } from '../common/Tweet';
import Home from "./Home";
import TweetList from "./TweetList";

type TweetsProps = {};

type TweetsState = {
    tweets: Tweet[];
};

export default class Tweets extends Component<TweetsProps, TweetsState> {
    constructor(props: TweetsProps) {
        super(props);

        // TODO: change
        this.state = {
            tweets: [
                new Tweet(
                    0,
                    'jsmith',
                    'John Smith',
                    'Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.',
                    new Date('2022-04-22T19:15:59')),
                new Tweet
                (
                    1,
                    'jsmith',
                    'John Smith',
                    'Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.',
                    new Date('2022-04-22T17:45:25'))
            ]
        };
    }

    render() {
        return (
            <Home>
                <TweetList title={'Tweets'} tweets={this.state.tweets}/>
            </Home>
        );
    }
}
