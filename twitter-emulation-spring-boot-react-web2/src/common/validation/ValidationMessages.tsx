import { Component, ContextType } from 'react';
import { ValidationContext } from './ValidationContext';

export class ValidationMessages extends Component {
    static contextType = ValidationContext;
    declare context: ContextType<typeof ValidationContext>;

    render() {
        const errors: string[] = this.context.getMessagesForFields();

        return (
            <>
                {(errors.length > 0) &&
                    <div className="alert alert-danger">
                        There are problems with the form
                        <ul>
                            {errors.map(error =>
                                <li key={error}>
                                    {error}
                                </li>
                            )}
                        </ul>
                    </div>
                }
            </>
        );
    }
}
