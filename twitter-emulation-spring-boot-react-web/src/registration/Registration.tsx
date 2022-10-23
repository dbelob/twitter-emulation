import { ChangeEvent, Component } from 'react';

type RegistrationProps = {};

type RegistrationState = {
    username: '';
    password: '';
    passwordConfirmation: '';
    description: '';
};

export default class Registration extends Component<RegistrationProps, RegistrationState> {
    updateFormValue = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    render() {
        return (
            <div className="container-dialog p-2">
                <h3 className="bg-info p-1 text-white text-center rounded">Registration</h3>

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
                           value={this.state.passwordConfirmation}
                           onChange={this.updateFormValue}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <input type="text"
                           className="form-control" id="description" name="description"
                           value={this.state.description}
                           onChange={this.updateFormValue}/>
                </div>
            </div>
        );
    }
}
