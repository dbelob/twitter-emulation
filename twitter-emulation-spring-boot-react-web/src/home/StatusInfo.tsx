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

        this.state = {
            copyrightDate: new Date()
        };
    }

    render() {
        return (
            <div className="card p-3 bg-light">
                {this.props.userState.isAuthenticated() &&
                    <div className="row m-1" data-testid="logged">
                        <div className="col">
                            Logged in as <span data-testid="username" className="fw-bold">{this.props.userState.authenticatedUserName}</span>
                        </div>
                    </div>
                }
                <div className="row m-1">
                    <div className="col">
                        © Acme, {this.state.copyrightDate && format(this.state.copyrightDate, 'yyyy')}
                    </div>
                </div>
            </div>
        );
    }
}
