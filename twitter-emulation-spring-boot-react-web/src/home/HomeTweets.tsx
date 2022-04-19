import { Component } from 'react';
import Home from './Home';

type HomeTweetsProps = {
    // tweets: Tweet[];
};

type HomeTweetsState = {};

export default class HomeTweets extends Component<HomeTweetsProps, HomeTweetsState> {
    render() {
        return (
            <Home>
                <div>HomeTweets</div>
            </Home>
        );
    }
}
