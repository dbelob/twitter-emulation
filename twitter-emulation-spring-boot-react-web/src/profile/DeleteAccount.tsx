import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { resolve } from 'inversify-react';
import { AccountService } from '../common/services/AccountService';
import { AuthenticationService } from '../common/services/AuthenticationService';
import { User } from '../common/models/User';
import MessageText from '../message/MessageText';

type DeleteAccountProps = {};

type DeleteAccountState = {
    user: User,
    isSubmit: boolean;
}

export default class DeleteAccount extends Component<DeleteAccountProps, DeleteAccountState> {
    @resolve(AuthenticationService)
    private readonly authenticationService!: AuthenticationService;

    @resolve(AccountService)
    private readonly accountService!: AccountService;

    constructor(props: DeleteAccountProps) {
        super(props);

        this.state = {
            user: new User(),
            isSubmit: false
        };
    }

    componentDidMount() {
        this.authenticationService.getUser()
            .subscribe(data => {
                this.setState({
                    user: data
                });
            });
    }

    delete = () => {
        if (this.state.user.name) {
            this.accountService.deleteAccount(this.state.user.name)
                .subscribe(data => {
                    this.setState({
                        isSubmit: true
                    });
                });
        }
    }

    render() {
        return (
            <>
                {this.state.isSubmit ? <Navigate to="/login?logout=1"/> :
                    <div className="container-dialog p-2">
                        <h3 className="bg-danger p-1 text-white text-center rounded">Delete account</h3>

                        <MessageText/>

                        <div className="alert text-center">
                            Are you sure to delete account '{this.state.user.name}'?
                        </div>
                        <div className="text-center">
                            <button className="btn btn-danger m-1" onClick={this.delete}>Delete</button>
                            <Link to="/account/profile">
                                <button className="btn btn-secondary m-1">Cancel</button>
                            </Link>
                        </div>
                    </div>
                }
            </>
        );
    }
}
