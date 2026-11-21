import { useEffect, useState } from 'react';
import { cid, useInject } from 'inversify-hooks';
import { StringParam, useQueryParam } from 'use-query-params';
import { useAuth } from '../common/authentication/AuthProvider';
import { Account } from '../common/models/Account';
import { AccountService } from '../common/services/AccountService';
import Home from './Home';
import AccountList from './AccountList';
import Loading from './Loading';

export default function Search() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [searchText] = useQueryParam('searchText', StringParam);
    const auth = useAuth();
    const [accountService] = useInject<AccountService>(cid.AccountService);

    useEffect(() => {
        const loadAccounts = async () => {
            accountService.getAccounts(searchText)
                .then(response => setAccounts(response.data));
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
