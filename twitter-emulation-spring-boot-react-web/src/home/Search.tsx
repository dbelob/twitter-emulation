import React, { useEffect, useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { useInjection } from 'inversify-react';
import { StringParam, useQueryParam } from 'use-query-params';
import { useAuth } from '../common/authentication/AuthProvider';
import { Account } from '../common/models/Account';
import { AccountService } from '../common/services/AccountService';
import Home from './Home';
import AccountList from './AccountList';
import Loading from './Loading';

type SearchProps = {};

export default function Search(props: SearchProps) {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [searchText, setSearchText] = useQueryParam('searchText', StringParam);
    const auth = useAuth();
    const accountService = useInjection(AccountService);

    useEffect(() => {
        const loadAccounts = async () => {
            const accounts = await firstValueFrom(accountService.getAccounts(searchText))
            setAccounts(accounts);
        };

        loadAccounts();
    }, [searchText]);

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
