import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { firstValueFrom } from 'rxjs';
import { useInjection } from 'inversify-react';
import { useAuth } from '../common/authentication/AuthProvider';
import { Tweet } from '../common/models/Tweet';
import ReactUtils from '../common/ReactUtils';
import { TweetDataSource } from '../common/datasources/TweetDataSource';
import Home from './Home';
import Loading from './Loading';
import TweetList from './TweetList';

type MainProps = {
    params: any;
};

function Main(props: MainProps) {
    const initialTweets: Tweet[] = [];
    const [tweets, setTweets] = useState(initialTweets);
    const auth = useAuth();
    const tweetDataSource = useInjection(TweetDataSource);

    useEffect(() => {
        const loadTweets = async () => {
            const tweets = await firstValueFrom(tweetDataSource.getTimeline());

            setTweets(tweets);
        };

        loadTweets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {user} = props.params;

    return (
        <>
            {
                auth.loading ?
                    <Loading/> :
                    ((user !== auth.username) ?
                            <Navigate to={`/account/tweets/${user}`} replace/> :
                            <Home>
                                <TweetList tweets={tweets}/>
                            </Home>
                    )
            }
        </>
    );
}

export default ReactUtils.withParams(Main);
