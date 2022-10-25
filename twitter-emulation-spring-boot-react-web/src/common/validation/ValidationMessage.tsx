import React, { Component, ContextType } from 'react';
import { ValidationContext } from './ValidationContext';

type ValidationMessageProps = {
    field: string;
}

type ValidationMessageState = {}

export class ValidationMessage extends Component<ValidationMessageProps, ValidationMessageState> {
    static contextType = ValidationContext;
    // declare context: ContextType<typeof ValidationContext>;
    context!: ContextType<typeof ValidationContext>;

    render() {
        return this.context.getMessagesForField(this.props.field).map(err =>
            <div className="small bg-danger text-white mt-1 p-1"
                 key={err}>
                {err}
            </div>
        )
    }
}
