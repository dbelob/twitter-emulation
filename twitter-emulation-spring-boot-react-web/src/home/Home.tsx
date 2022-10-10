import React, { useEffect, useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { useInjection } from 'inversify-react';
import MessageText from '../message/MessageText';
import { AccountStatistics } from '../common/models/AccountStatistics';
import { UserState } from '../common/models/UserState';
import { useAuth } from '../common/authentication/AuthProvider';
import { AccountDataSource } from '../common/datasources/AccountDataSource';
import AccountInfo from './AccountInfo';
import Loading from './Loading';
import StatusInfo from './StatusInfo';
import TopBar from './TopBar';

type HomeProps = {
    username: string;
    children: React.ReactNode;
};

export default function Home(props: HomeProps) {
    const [userState, setUserState] = useState<UserState>(new UserState());
    const [accountStatistics, setAccountStatistics] = useState<AccountStatistics>(new AccountStatistics());
    const auth = useAuth();
    const accountDataSource = useInjection(AccountDataSource);

    useEffect(() => {
        const loadAccountStatistics = async () => {
            const accountStatistics = await firstValueFrom(accountDataSource.getAccountStatistics(props.username));

            setAccountStatistics(accountStatistics);
        };

        loadAccountStatistics();
    }, []);

    if (auth.loading) {
        return <Loading/>;
    } else {
        setUserState(new UserState(auth.username, props.username));

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
                        <AccountInfo userState={userState} accountStatistics={accountStatistics}/>
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
