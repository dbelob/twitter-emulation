import { Component } from 'react';
import { Link } from 'react-router-dom';
import { resolve } from 'inversify-react';
import { UserState } from '../common/models/UserState';
import { AuthenticationDataSource } from '../common/datasources/AuthenticationDataSource';

type TopBarProps = {
    userState: UserState;
};

type TopBarState = {};

export default class TopBar extends Component<TopBarProps, TopBarState> {
    @resolve(AuthenticationDataSource)
    private readonly authenticationDataSource!: AuthenticationDataSource;

    logout = () => {
        this.authenticationDataSource.logout(() => {
            //TODO: implement
            console.log('logout()');
        });
    }

    render() {
        return (
            <div className="row m-0">
                <div className="col-3 p-1">
                    <Link to="/account/show" className="btn btn-link m-0" role="button">Main</Link>
                </div>
                <div className="col-6 p-1">
                    <div className="input-group mt-1">
                        <input type="search" className="form-control" id="searchText" name="searchText" placeholder="Search accounts..."/>
                        <div className="input-group-append">
                            <button className="btn btn-primary">Search</button>
                        </div>
                    </div>
                </div>
                <div className="col-3 p-1">
                    <Link to="/tweet">
                        <button className="btn btn-primary m-1">Tweet</button>
                    </Link>
                    <Link to="/account/profile">
                        <button className="btn btn-link m-1">Profile</button>
                    </Link>
                    <button className="btn btn-link m-1" onClick={this.logout}>Logout</button>
                </div>
            </div>
        );
    }
}
