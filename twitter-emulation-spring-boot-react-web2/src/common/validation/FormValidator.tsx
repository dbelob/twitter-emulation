import React, { Component } from 'react';
import { validateData } from './ValidateData';
import { ValidationContext } from './ValidationContext';

type FormValidatorProps = {
    data: any;
    rules: any;
    submit: any;
    submitButtonTitle: string;
    validateForm: (data: any) => string[];
    children: React.ReactNode;
    rightButtons: React.ReactNode;
    submitUsingEnter: boolean;
};

type FormValidatorState = {
    errors: any;
    dirty: any;
    formSubmitted: boolean;
    getMessagesForField: any;
    getMessagesForFields: any;
    getFieldClasses: any,
    isFormSubmitted: any,
    isFormValid: any
};

export class FormValidator extends Component<FormValidatorProps, FormValidatorState> {
    static defaultProps = {
        validateForm: () => [],
        rightButtons: null,
        submitUsingEnter: true
    }

    constructor(props: FormValidatorProps) {
        super(props);

        this.state = {
            errors: {},
            dirty: {},
            formSubmitted: false,
            getMessagesForField: this.getMessagesForField,
            getMessagesForFields: this.getMessagesForFields,
            getFieldClasses: this.getFieldClasses,
            isFormSubmitted: this.isFormSubmitted,
            isFormValid: this.isFormValid
        }
    }

    static getDerivedStateFromProps(props: FormValidatorProps, state: FormValidatorState) {
        state.errors = validateData(props.data, props.rules);

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
        return (this.state.formSubmitted && !this.formValid) ? 'btn-secondary' : 'btn-primary';
    }

    getFieldClasses = (field: string) => {
        let result = (this.state.formSubmitted || this.state.dirty[field]) && this.state.errors[field] ?
            'rt-invalid' : 'rt-valid';

        if (this.state.dirty[field]) {
            result += ' rt-dirty';
        }

        return result;
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

    isFormSubmitted = () => {
        return this.state.formSubmitted;
    }

    isFormValid = () => {
        return this.formValid;
    }

    keyDownHandler = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            // Call submit function
            this.handleClick(event);
        }
    };

    componentDidMount() {
        if (this.props.submitUsingEnter) {
            document.addEventListener('keydown', this.keyDownHandler);
        }
    }

    componentWillUnmount() {
        if (this.props.submitUsingEnter) {
            document.removeEventListener('keydown', this.keyDownHandler);
        }
    }

    render() {
        return <>
            <ValidationContext.Provider value={this.state}>
                <div onChange={this.handleChange}>
                    {this.props.children}
                </div>
            </ValidationContext.Provider>
            <div className="text-center">
                <button className={`btn m-1 ${this.getButtonClasses()}`}
                        onClick={this.handleClick}
                        disabled={this.state.formSubmitted && !this.formValid}>
                    {this.props.submitButtonTitle}
                </button>
                {this.props.rightButtons}
            </div>
        </>
    }
}
