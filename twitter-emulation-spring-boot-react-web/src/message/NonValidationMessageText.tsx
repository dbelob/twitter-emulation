import { Component, ContextType } from 'react';
import { ValidationContext } from '../common/validation/ValidationContext';
import MessageText from './MessageText';

export default class NonValidationMessageText extends Component {
    static contextType = ValidationContext;
    declare context: ContextType<typeof ValidationContext>;

    render() {
        return (
            <>
                {!(this.context.isFormSubmitted() && !this.context.isFormValid()) &&
                    <MessageText/>
                }
            </>
        );
    }
}
