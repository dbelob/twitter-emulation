import { Component, ContextType } from 'react';
import { ValidationContext } from './ValidationContext';

type ValidationMessageProps = {
    field: string;
}

type ValidationMessageState = {}

export class ValidationMessage extends Component<ValidationMessageProps, ValidationMessageState> {
    static contextType = ValidationContext;
    declare context: ContextType<typeof ValidationContext>;

    render() {
        return this.context.getMessagesForField(this.props.field).map(error =>
            <div className="small bg-danger text-white rounded mt-1 p-1" key={error}>
                {error}
            </div>
        );
    }
}
