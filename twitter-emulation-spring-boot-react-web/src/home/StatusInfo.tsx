import { Component } from 'react';
import { format } from 'date-fns';
import { UserState } from '../common/models/UserState';

type StatusInfoProps = {
    userState: UserState;
};

type StatusInfoState = {
    copyrightDate: Date;
};

export default class StatusInfo extends Component<StatusInfoProps, StatusInfoState> {
    constructor(props: StatusInfoProps) {
        super(props);

        // TODO: change
        this.state = {
            copyrightDate: new Date()
        };
    }

    isStateVisible(): boolean {
        return this.props.userState.isAuthenticated();
    }

    render() {
        return (
            <div className="card p-3 bg-light">
                <div className="row m-1" id="state">
                    <div className="col">
                        Logged in as <span className="fw-bold">{this.props.userState.authenticatedUserName}</span>
                    </div>
                </div>
                <div className="row m-1">
                    <div className="col">
                        &copy; Acme, {this.state.copyrightDate && format(this.state.copyrightDate, 'yyyy')}
                    </div>
                </div>
            </div>
        );
    }
}
