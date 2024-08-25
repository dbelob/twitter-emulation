import { Component, ContextType } from 'react';
import { ValidationContext } from './ValidationContext';

type ValidatableTextareaProps = {
    className: string;
    rows: number;
    id: string;
    name: string;
    value: string;
    onChange: any;
    autoFocus: boolean;
}

type ValidatableTextareaState = {}

export class ValidatableTextarea extends Component<ValidatableTextareaProps, ValidatableTextareaState> {
    static contextType = ValidationContext;
    declare context: ContextType<typeof ValidationContext>;

    public static defaultProps = {
        className: '',
        autoFocus: false
    };

    render() {
        const contextClassNames = this.context.getFieldClasses(this.props.name);

        return <textarea className={`${this.props.className} ${contextClassNames}`} rows={this.props.rows}
                         id={this.props.id} name={this.props.name} value={this.props.value}
                         onChange={this.props.onChange} autoFocus={this.props.autoFocus}/>
    }
}
