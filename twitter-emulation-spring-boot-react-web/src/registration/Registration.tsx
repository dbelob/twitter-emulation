import { ChangeEvent, Component } from 'react';
import { FormValidator } from '../common/validation/FormValidator';
import { ValidateForm } from '../common/validation/WholeFormValidateForm';
import { ValidationMessage } from '../common/validation/ValidationMessage';

type RegistrationProps = {
};

type RegistrationState = {
    username: string;
    password: string;
    passwordConfirmation: string;
    description: string;
};

export default class Registration extends Component<RegistrationProps, RegistrationState> {
    private rules: any;

    constructor(props: RegistrationProps) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordConfirmation: '',
            description: ''
        };

        this.rules = {
            username: {required: true, minlength: 1, maxlength: 16},
            password: {required: true, minlength: 5, maxlength: 25, equals: 'passwordConfirmation'},
            passwordConfirmation: {required: true, minlength: 5, maxlength: 25, equals: 'password'},
            description: {required: true, minlength: 2, maxlength: 30}
        };
    }

    updateFormValue = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    submit = (data: any) => {
        // TODO: implement
        console.log('Registration data: ' + JSON.stringify(data));
    }

    render() {
        return (
            <div className="container-dialog p-2">
                <h3 className="bg-info p-1 text-white text-center rounded">Registration</h3>

                <FormValidator data={this.state} rules={this.rules}
                               submit={this.submit}
                               validateForm={ValidateForm}>
                    <ValidationMessage field="form"/>
                    
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input type="text"
                               className="form-control" id="username" name="username"
                               value={this.state.username}
                               onChange={this.updateFormValue}
                               autoFocus/>
                        <ValidationMessage field="username"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password"
                               className="form-control" id="password" name="password"
                               value={this.state.password}
                               onChange={this.updateFormValue}/>
                        <ValidationMessage field="password"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordConfirmation" className="form-label">Confirmation:</label>
                        <input type="password"
                               className="form-control" id="passwordConfirmation" name="passwordConfirmation"
                               value={this.state.passwordConfirmation}
                               onChange={this.updateFormValue}/>
                        <ValidationMessage field="passwordConfirmation"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <input type="text"
                               className="form-control" id="description" name="description"
                               value={this.state.description}
                               onChange={this.updateFormValue}/>
                        <ValidationMessage field="description"/>
                    </div>
                </FormValidator>
            </div>
        );
    }
}
