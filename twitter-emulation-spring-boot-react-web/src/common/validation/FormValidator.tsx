import React, { Component } from 'react';
import { ValidateData } from './ValidateData';
import { ValidationContext } from './ValidationContext';

type FormValidatorProps = {
    data: any;
    rules: any;
    submit: any;
    validateForm: (data: any) => string[];
    children: React.ReactNode;
};

type FormValidatorState = {
    errors: any;
    dirty: any;
    formSubmitted: boolean;
    getMessagesForField: any;
    getMessagesForFields: any;
};

export class FormValidator extends Component<FormValidatorProps, FormValidatorState> {
    constructor(props: FormValidatorProps) {
        super(props);

        this.state = {
            errors: {},
            dirty: {},
            formSubmitted: false,
            getMessagesForField: this.getMessagesForField,
            getMessagesForFields: this.getMessagesForFields
        }
    }

    static getDerivedStateFromProps(props: FormValidatorProps, state: FormValidatorState) {
        state.errors = ValidateData(props.data, props.rules);

        if (state.formSubmitted && Object.keys(state.errors).length === 0) {
            let formErrors = props.validateForm(props.data);

            if (formErrors.length > 0) {
                state.errors.form = formErrors;
            }
        }

        return state;
    }

    get formValid() {
        return Object.keys(this.state.errors).length === 0;
    }

    handleChange = (event: any) => {
        const name = event.target.name;

        this.setState(state => {
            state.dirty[name] = true
        });
    }

    handleClick = (event: any) => {
        this.setState({formSubmitted: true}, () => {
            if (this.formValid) {
                const formErrors = this.props.validateForm(this.props.data);

                if (formErrors.length === 0) {
                    this.props.submit(this.props.data)
                }
            }
        });
    }

    getButtonClasses() {
        return this.state.formSubmitted && !this.formValid
            ? "btn-danger" : "btn-primary";
    }

    getMessagesForField = (field: string) => {
        return (this.state.formSubmitted || this.state.dirty[field]) ?
            this.state.errors[field] || [] : [];
    }

    getMessagesForFields = () => {
        if (this.state.formSubmitted) {
            const result: string[] = [];
            const fields = ['form'];

            fields.push(...Object.keys(this.state.errors));

            fields.forEach(field => {
                const fieldErrors = this.state.errors[field];

                if (fieldErrors && (fieldErrors.length > 0)) {
                    result.push(...fieldErrors);
                }
            });

            return result;
        } else {
            return [];
        }
    }

    render() {
        return <React.Fragment>
            <ValidationContext.Provider value={this.state}>
                <div onChange={this.handleChange}>
                    {this.props.children}
                </div>
            </ValidationContext.Provider>
            <div className="text-center">
                <button className={`btn ${this.getButtonClasses()}`}
                        onClick={this.handleClick}
                        disabled={this.state.formSubmitted && !this.formValid}>
                    Submit
                </button>
            </div>
        </React.Fragment>
    }
}
