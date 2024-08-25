import React from 'react';
import MessageText from '../message/MessageText';
import { UserState } from '../common/models/UserState';
import { useAuth } from '../common/authentication/AuthProvider';
import AccountInfo from './AccountInfo';
import Loading from './Loading';
import StatusInfo from './StatusInfo';
import TopBar from './TopBar';

type HomeProps = {
    username: string;
    children: React.ReactNode;
};

export default function Home(props: HomeProps) {
    const auth = useAuth();

    if (auth.loading) {
        return <Loading/>;
    } else {
        const userState = new UserState(auth.username, props.username);

        return (
            <div className="container p-0">
                <div className="row m-0">
                    <div className="col-12 mt-1">
                        <MessageText autoHide={true}></MessageText>
                    </div>
                </div>
                <TopBar userState={userState}/>
                <div className="row text-black m-0">
                    <div className="col-3 p-1">
                        <AccountInfo userState={userState}/>
                    </div>
                    <div className="col-6 p-1">
                        {props.children}
                    </div>
                    <div className="col-3 p-1">
                        <StatusInfo userState={userState}/>
                    </div>
                </div>
            </div>
        );
    }
}
