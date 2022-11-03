import React, { useEffect, useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { useInjection } from 'inversify-react';
import MessageText from '../message/MessageText';
import { AccountStatistics } from '../common/models/AccountStatistics';
import { UserState } from '../common/models/UserState';
import { useAuth } from '../common/authentication/AuthProvider';
import { AccountService } from '../common/services/AccountService';
import AccountInfo from './AccountInfo';
import Loading from './Loading';
import StatusInfo from './StatusInfo';
import TopBar from './TopBar';

type HomeProps = {
    username: string;
    children: React.ReactNode;
};

export default function Home(props: HomeProps) {
    const [accountStatistics, setAccountStatistics] = useState<AccountStatistics>(new AccountStatistics());
    const auth = useAuth();
    const accountService = useInjection(AccountService);

    useEffect(() => {
        const loadAccountStatistics = async () => {
            const accountStatistics = await firstValueFrom(accountService.getAccountStatistics(props.username));

            setAccountStatistics(accountStatistics);
        };

        loadAccountStatistics();
    }, []);

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
