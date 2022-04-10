import { Component } from "react";
import { Link } from "react-router-dom";

type TopBarProps = {};

type TopBarState = {};

export default class TopBar extends Component<TopBarProps, TopBarState> {
    logout() {
        //TODO: implement
        console.log('logout()');
    }

    render() {
        return (
            <div className="row m-0">
                <div className="col-3 p-1">
                    <Link to="/account/show" className="btn btn-link m-0" role="button">Main</Link>
                </div>
                <div className="col-6 p-1">
                    Search accounts...
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
