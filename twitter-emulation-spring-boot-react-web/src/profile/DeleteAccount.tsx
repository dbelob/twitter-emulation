import { useEffect, useState } from 'react';
import { cid, useInject } from 'inversify-hooks';
import { Link, useNavigate } from 'react-router';
import { AccountService } from '../common/services/AccountService';
import { AuthenticationService } from '../common/services/AuthenticationService';
import { User } from '../common/models/User';
import MessageText from '../message/MessageText';

export default function DeleteAccount() {
    const [user, setUser] = useState<User>(new User());
    const [authenticationService] = useInject<AuthenticationService>(cid.AuthenticationService);
    const [accountService] = useInject<AccountService>(cid.AccountService);
    const navigate = useNavigate();

    useEffect(() => {
        authenticationService.getUser()
            .then(response => {
                setUser(response.data);
            });
    }, []);

    function deleteAccount() {
        if (user.name) {
            accountService.deleteAccount(user.name)
                .then(() => {
                    navigate({
                        pathname: '/login',
                        search: '?logout=1'
                    });
                });
        }
    }

    return (
        <div className="container-dialog p-2">
            <h3 className="bg-danger p-1 text-white text-center rounded">Delete account</h3>

            <MessageText/>

            <div className="alert text-center">
                Are you sure to delete account '{user.name}'?
            </div>
            <div className="text-center">
                <button className="btn btn-danger m-1" onClick={deleteAccount}>Delete</button>
                <Link to="/account/profile">
                    <button className="btn btn-secondary m-1">Cancel</button>
                </Link>
            </div>
        </div>
    );
}
