import React, { Component } from 'react';
import AccountInfo from './AccountInfo';
import StatusInfo from './StatusInfo';
import TopBar from './TopBar';
import MessageText from '../message/MessageText';
import { AccountStatistics } from '../common/AccountStatistics';
import { UserState } from "../common/UserState";

type HomeProps = {
    children: React.ReactNode;
};

type HomeState = {
    userState: UserState;
    accountStatistics: AccountStatistics;
};

export default class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);

        // TODO: change
        this.state = {
            userState: new UserState(
                'jsmith',
                'jsmith'),
            accountStatistics: new AccountStatistics(
                'jsmith',
                'John Smith',
                6,
                2,
                1,
                false
            )
        };
    }

    render() {
        return (
            <div className="container p-0">
                <div className="row m-0">
                    <div className="col-12 mt-1">
                        <MessageText autoHide={true}></MessageText>
                    </div>
                </div>
                <TopBar userState={this.state.userState}/>
                <div className="row text-black m-0">
                    <div className="col-3 p-1">
                        <AccountInfo accountStatistics={this.state.accountStatistics}/>
                    </div>
                    <div className="col-6 p-1">
                        {this.props.children}
                    </div>
                    <div className="col-3 p-1">
                        <StatusInfo userState={this.state.userState}/>
                    </div>
                </div>
            </div>
        );
    }
}
