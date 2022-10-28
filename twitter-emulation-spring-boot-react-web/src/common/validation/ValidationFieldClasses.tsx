import React, { Component, ContextType } from 'react';
import { ValidationContext } from './ValidationContext';

type ValidationFieldClassesProps = {
    field: string;
}

type ValidationFieldClassesState = {}

export class ValidationFieldClasses extends Component<ValidationFieldClassesProps, ValidationFieldClassesState> {
    static contextType = ValidationContext;
    context!: ContextType<typeof ValidationContext>;

    render() {
        return this.context.getFieldClasses(this.props.field);
    }
}
