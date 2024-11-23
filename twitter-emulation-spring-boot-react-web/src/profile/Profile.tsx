import { ChangeEvent, Component } from 'react';
import { Link, Navigate } from 'react-router';
import { resolve } from 'inversify-react';
import { FormValidator } from '../common/validation/FormValidator';
import { ValidatableInput } from '../common/validation/ValidatableInput';
import { ValidationMessages } from '../common/validation/ValidationMessages';
import { AccountService } from '../common/services/AccountService';
import { AuthenticationService } from '../common/services/AuthenticationService';
import NonValidationMessageText from '../message/NonValidationMessageText';
import { Account } from '../common/models/Account';

type ProfileProps = {};

type ProfileState = {
    id?: number,
    username: string;
    password: string;
    confirmation: string;
    description: string;
    isSubmit: boolean;
};

export default class Profile extends Component<ProfileProps, ProfileState> {
    @resolve(AuthenticationService)
    private readonly authenticationService!: AuthenticationService;

    @resolve(AccountService)
    private readonly accountService!: AccountService;

    private readonly rules: any;

    constructor(props: ProfileProps) {
        super(props);

        this.state = {
            id: undefined,
            username: '',
            password: '',
            confirmation: '',
            description: '',
            isSubmit: false
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
    };

    componentDidMount() {
        this.authenticationService.getUser()
            .then(response => {
                const user = response.data;

                if (user.name) {
                    this.accountService.getAccount(user.name)
                        .then(response => {
                            const account = response.data;

                            this.setState({
                                id: account.id,
                                username: (account.username) ? account.username : '',
                                password: (account.password) ? account.password : '',
                                confirmation: (account.password) ? account.password : '',
                                description: (account.description) ? account.description : ''
                            });
                        });
                }
            });
    }

    submit = () => {
        this.accountService.saveAccount(
            this.state.username,
            new Account(
                this.state.id,
                this.state.username,
                this.state.password,
                this.state.description))
            .then(() => {
                this.setState({
                    isSubmit: true
                });
            });
    };

    render() {
        return (
            <>
                {this.state.isSubmit ? <Navigate to={`/account/show/${this.state.username}`}/> :
                    <div className="container-dialog p-2">
                        <h3 className="bg-info p-1 text-white text-center rounded">Profile</h3>
                        <FormValidator data={this.state} rules={this.rules}
                                       submit={this.submit} submitButtonTitle={'Save'}
                                       rightButtons={
                                           <>
                                               <Link to="/account/show">
                                                   <button className="btn btn-secondary m-1" id="cancel">Cancel</button>
                                               </Link>
                                               <Link to="/account/delete">
                                                   <button className="btn btn-link m-1">Delete</button>
                                               </Link>
                                           </>}>
                            <NonValidationMessageText/>
                            <ValidationMessages/>

                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username:</label>
                                <ValidatableInput type="text"
                                                  className="form-control" id="username" name="username"
                                                  value={this.state.username}
                                                  onChange={this.updateFormValue}
                                                  readOnly={true}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <ValidatableInput type="password"
                                                  className="form-control" id="password" name="password"
                                                  value={this.state.password}
                                                  onChange={this.updateFormValue}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmation" className="form-label">Confirmation:</label>
                                <ValidatableInput type="password"
                                                  className="form-control" id="confirmation" name="confirmation"
                                                  value={this.state.confirmation}
                                                  onChange={this.updateFormValue}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description:</label>
                                <ValidatableInput type="text"
                                                  className="form-control" id="description" name="description"
                                                  value={this.state.description}
                                                  onChange={this.updateFormValue}/>
                            </div>
                        </FormValidator>
                    </div>
                }
            </>
        );
    }
}
