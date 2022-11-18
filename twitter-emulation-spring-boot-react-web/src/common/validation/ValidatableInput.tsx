import { Component, ContextType } from 'react';
import { ValidationContext } from './ValidationContext';

type ValidatableInputProps = {
    type: string;
    className: string;
    id: string;
    name: string;
    value: string;
    onChange: any;
    autoFocus: boolean;
    readOnly: boolean;
}

type ValidatableInputState = {}

export class ValidatableInput extends Component<ValidatableInputProps, ValidatableInputState> {
    static contextType = ValidationContext;
    declare context: ContextType<typeof ValidationContext>;

    public static defaultProps = {
        className: '',
        autoFocus: false,
        readOnly: false
    };

    render() {
        const contextClassNames = this.context.getFieldClasses(this.props.name);

        return <input type={this.props.type} className={`${this.props.className} ${contextClassNames}`}
                      id={this.props.id} name={this.props.name} value={this.props.value} readOnly={this.props.readOnly}
                      onChange={this.props.onChange} autoFocus={this.props.autoFocus}/>;
    }
}
