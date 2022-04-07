import { Component } from "react";
import AccountInfo from "./AccountInfo";
import Follow from "./Follow";
import TopBar from "./TopBar";

export interface HomeProps {
}

export interface HomeState {
}

export default class Home extends Component<HomeProps, HomeState> {
    render() {
        return (
            <div className="container p-0">
                <TopBar/>
                <div className="row text-black m-0">
                    <div className="col-3 p-1">
                        <AccountInfo/>
                    </div>
                    <div className="col-6 p-1">
                        {this.props.children}
                    </div>
                    <div className="col-3 p-1">
                        <Follow/>
                    </div>
                </div>
            </div>
        );
    }
}
