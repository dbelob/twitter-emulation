import React, { Component } from 'react';
import AccountInfo from './AccountInfo';
import StatusInfo from './StatusInfo';
import TopBar from './TopBar';
import MessageText from '../message/MessageText';
import { AccountStatistics } from '../common/models/AccountStatistics';
import { UserState } from '../common/models/UserState';
import { AccountDataSource } from '../common/datasources/AccountDataSource';
import { resolve } from "inversify-react";

type HomeProps = {
    userState: UserState;
    children: React.ReactNode;
};

type HomeState = {
    accountStatistics: AccountStatistics;
};

export default class Home extends Component<HomeProps, HomeState> {
    @resolve(AccountDataSource)
    private readonly accountDataSource!: AccountDataSource;

    constructor(props: HomeProps) {
        super(props);

        // TODO: change
        this.state = {
            accountStatistics: new AccountStatistics()
        };
    }

    componentDidMount() {
        const dataUserName = this.props.userState.getDataUserName();

        if (dataUserName) {
            this.accountDataSource.getAccountStatistics(dataUserName)
                .subscribe(response => {
                    this.setState({accountStatistics: response.data});
                });
        }
    }

    render() {
        return (
            <div className="container p-0">
                <div className="row m-0">
                    <div className="col-12 mt-1">
                        <MessageText autoHide={true}></MessageText>
                    </div>
                </div>
                <TopBar userState={this.props.userState}/>
                <div className="row text-black m-0">
                    <div className="col-3 p-1">
                        <AccountInfo userState={this.props.userState} accountStatistics={this.state.accountStatistics}/>
                    </div>
                    <div className="col-6 p-1">
                        {this.props.children}
                    </div>
                    <div className="col-3 p-1">
                        <StatusInfo userState={this.props.userState}/>
                    </div>
                </div>
            </div>
        );
    }
}
