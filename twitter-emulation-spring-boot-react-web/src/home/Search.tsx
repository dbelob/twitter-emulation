import React, { useEffect, useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { useInjection } from 'inversify-react';
import { useAuth } from '../common/authentication/AuthProvider';
import { Account } from '../common/models/Account';
import { AccountDataSource } from '../common/datasources/AccountDataSource';
import Home from './Home';
import AccountList from './AccountList';
import Loading from './Loading';

type SearchProps = {};

export default function Search(props: SearchProps) {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const auth = useAuth();
    const accountDataSource = useInjection(AccountDataSource);

    useEffect(() => {
        const loadAccounts = async () => {
            // TODO: change
            const accounts = await firstValueFrom(accountDataSource.getAccounts(''));
        };

        loadAccounts();
    }, []);

    if (auth.loading) {
        return <Loading/>;
    } else {
        return (
            <Home username={auth.username}>
                <AccountList title={'Search Result'} accounts={accounts}></AccountList>
            </Home>
        );
    }
}
