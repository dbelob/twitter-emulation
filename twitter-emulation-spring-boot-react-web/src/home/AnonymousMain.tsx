import React, { Component } from 'react';
import { resolve } from 'inversify-react';
import { UserState } from '../common/models/UserState';
import { AuthenticationDataSource } from '../common/datasources/AuthenticationDataSource';
import { Navigate } from "react-router-dom";

type AnonymousMainProps = {}

type AnonymousState = {
    userState?: UserState;
}

export default class AnonymousMain extends Component<AnonymousMainProps, AnonymousState> {
    @resolve(AuthenticationDataSource)
    private readonly authenticationDataSource!: AuthenticationDataSource;

    constructor(props: AnonymousMainProps) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.authenticationDataSource.getUser()
            .subscribe(response => {
                this.setState({
                    userState: new UserState(response.data?.name, undefined)
                });
            });
    }

    render() {
        return (
            <>
                {
                    (this.state.userState) ?
                        <Navigate to={`/account/show/${this.state.userState.authenticatedUserName}`} replace/> :
                        <div className="text-center">
                            Loading...
                        </div>
                }
            </>
        );
    }
}
