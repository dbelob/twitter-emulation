import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { useInjection } from 'inversify-react';
import { UserState } from '../common/models/UserState';
import { AuthenticationService } from '../common/services/AuthenticationService';

type TopBarProps = {
    userState: UserState;
}

export default function TopBar(props: TopBarProps) {
    const authenticationService = useInjection(AuthenticationService);
    const navigate = useNavigate();

    function search(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const searchText = formData.get('searchText') as string;

        navigate({
            pathname: '/account/search',
            search: `?searchText=${searchText}`
        });
    }

    function login() {
        navigate('/login');
    }

    function logout() {
        authenticationService.logout(() => {
            navigate({
                pathname: '/login',
                search: '?logout=1'
            });
        });
    }

    return (
        <>
            {props.userState.isAuthenticated() ?
                <div className="row m-0">
                    <div className="col-3 p-1">
                        <Link to="/account/show" className="btn btn-link m-0" role="button">Main</Link>
                    </div>
                    <div className="col-6 p-1">
                        <form onSubmit={search}>
                            <div className="input-group mt-1">
                                <input type="search" className="form-control" id="searchText" name="searchText"
                                       placeholder="Search accounts..."/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-3 p-1">
                        <Link to="/tweet">
                            <button className="btn btn-primary m-1">Tweet</button>
                        </Link>
                        <Link to="/account/profile">
                            <button className="btn btn-link m-1">Profile</button>
                        </Link>
                        <button className="btn btn-link m-1" onClick={logout}>Logout</button>
                    </div>
                </div> :
                <div className="row m-0">
                    <div className="col-3 p-1">
                    </div>
                    <div className="col-6 p-1">
                    </div>
                    <div className="col-3 p-1">
                        <button className="btn btn-link m-1" onClick={login}>Login</button>
                    </div>
                </div>
            }
        </>
    );
}
