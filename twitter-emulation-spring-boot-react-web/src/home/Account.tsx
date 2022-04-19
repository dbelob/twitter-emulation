import { Component } from 'react';
import HomeTweets from './HomeTweets';
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
            tweets: []
        };
    }

    render() {
        return (
            <HomeTweets>
            </HomeTweets>
        );
    }
}
