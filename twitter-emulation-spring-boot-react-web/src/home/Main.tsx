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
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const auth = useAuth();
    const tweetDataSource = useInjection(TweetDataSource);

    useEffect(() => {
        const loadTweets = async () => {
            const tweets = await firstValueFrom(tweetDataSource.getTimeline());

            setTweets(tweets);
        };

        loadTweets();
    }, []);

    const {user} = props.params;

    return (
        <>
            {
                auth.loading ?
                    <Loading/> :
                    ((user !== auth.username) ?
                            <Navigate to={`/account/tweets/${user}`} replace/> :
                            <Home username={user}>
                                <TweetList tweets={tweets}/>
                            </Home>
                    )
            }
        </>
    );
}

export default ReactUtils.withParams(Main);
