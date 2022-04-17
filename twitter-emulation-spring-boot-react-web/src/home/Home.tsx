import React, { Component } from 'react';
import AccountInfo from './AccountInfo';
import Follow from './Follow';
import TopBar from './TopBar';
import { AccountStatistics } from '../common/AccountStatistics';

type HomeProps = {
    children: React.ReactNode;
};

type HomeState = {
    accountStatistics: AccountStatistics;
};

export default class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);

        // TODO: change
        this.state = {
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
                <TopBar/>
                <div className="row text-black m-0">
                    <div className="col-3 p-1">
                        <AccountInfo accountStatistics={this.state.accountStatistics}/>
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
