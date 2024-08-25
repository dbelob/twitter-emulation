import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useInjection } from 'inversify-react';
import { useAuth } from '../common/authentication/AuthProvider';
import { Tweet } from '../common/models/Tweet';
import ReactUtils from '../common/ReactUtils';
import { TweetService } from '../common/services/TweetService';
import Home from './Home';
import Loading from './Loading';
import TweetList from './TweetList';

type MainProps = {
    params: any;
};

function Main(props: MainProps) {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const auth = useAuth();
    const tweetDataSource = useInjection(TweetService);

    useEffect(() => {
        tweetDataSource.getTimeline(response => {
            setTweets(response.data);
        });
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
