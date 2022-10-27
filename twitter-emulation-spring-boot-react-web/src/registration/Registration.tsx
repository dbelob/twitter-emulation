import { ChangeEvent, Component } from 'react';
import { Link } from 'react-router-dom';
import { resolve } from 'inversify-react';
import { FormValidator } from '../common/validation/FormValidator';
import { ValidationMessages } from '../common/validation/ValidationMessages';
import { AccountService } from '../common/services/AccountService';
import { Account } from '../common/models/Account';

type RegistrationProps = {};

type RegistrationState = {
    username: string;
    password: string;
    confirmation: string;
    description: string;
};

export default class Registration extends Component<RegistrationProps, RegistrationState> {
    @resolve(AccountService)
    private readonly accountService!: AccountService;

    private rules: any;

    constructor(props: RegistrationProps) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmation: '',
            description: ''
        };

        this.rules = {
            username: {required: true, minlength: 1, maxlength: 16},
            password: {required: true, minlength: 5, maxlength: 25},
            confirmation: {required: true, minlength: 5, maxlength: 25, equals: 'password'},
            description: {required: true, minlength: 2, maxlength: 30}
        };
    }

    updateFormValue = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    submit = (data: any) => {
        this.accountService.addAccount(
            new Account(
                undefined,
                this.state.username,
                this.state.password,
                this.state.description))
            .subscribe(data => {
                // TODO: implement
                console.log('Registration data: ' + JSON.stringify(data));
            });
    }

    render() {
        return (
            <div className="container-dialog p-2">
                <h3 className="bg-info p-1 text-white text-center rounded">Registration</h3>

                <FormValidator data={this.state} rules={this.rules}
                               submit={this.submit} submitButtonTitle={'Register'}
                               rightButtons={
                                   <Link to="/login">
                                       <button className="btn btn-link m-1" id="register">Log in</button>
                                   </Link>}>
                    <ValidationMessages/>

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input type="text"
                               className="form-control" id="username" name="username"
                               value={this.state.username}
                               onChange={this.updateFormValue}
                               autoFocus/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password"
                               className="form-control" id="password" name="password"
                               value={this.state.password}
                               onChange={this.updateFormValue}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmation" className="form-label">Confirmation:</label>
                        <input type="password"
                               className="form-control" id="confirmation" name="confirmation"
                               value={this.state.confirmation}
                               onChange={this.updateFormValue}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <input type="text"
                               className="form-control" id="description" name="description"
                               value={this.state.description}
                               onChange={this.updateFormValue}/>
                    </div>
                </FormValidator>
            </div>
        );
    }
}
