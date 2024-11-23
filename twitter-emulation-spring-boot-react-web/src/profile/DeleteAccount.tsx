import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useInjection } from 'inversify-react';
import { AccountService } from '../common/services/AccountService';
import { AuthenticationService } from '../common/services/AuthenticationService';
import { User } from '../common/models/User';
import MessageText from '../message/MessageText';

export default function DeleteAccount() {
    const [user, setUser] = useState<User>(new User());
    const authenticationService = useInjection(AuthenticationService);
    const accountService = useInjection(AccountService);
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
