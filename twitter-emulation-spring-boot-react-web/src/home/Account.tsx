import { Component } from 'react';
import Home from "./Home";
import Tweets from './Tweets';
import { Tweet } from '../common/Tweet';

type AccountProps = {};

type AccountState = {
    tweets: Tweet[];
};

export default class Account extends Component<AccountProps, AccountState> {
    constructor(props: AccountProps) {
        super(props);

        // TODO: change
        this.state = {
            tweets: [
                new Tweet(
                    'jdoe',
                    'John Doe',
                    'Some people care too much. I think it\'s called love.',
                    new Date('2022-04-21T19:36:01')),
                new Tweet(
                    'jsmith',
                    'John Smith',
                    'Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.',
                    new Date('2022-04-21T19:36:01')),
                new Tweet(
                    'jdoe',
                    'John Doe',
                    'You can\'t stay in your corner of the Forest waiting for others to come to you. You have to go to them sometimes.',
                    new Date('2022-04-21T18:05:27'))
            ]
        };
    }

    render() {
        return (
            <Home>
                <Tweets tweets={this.state.tweets}/>
            </Home>
        );
    }
}
