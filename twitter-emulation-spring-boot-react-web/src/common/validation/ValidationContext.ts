import React from 'react';

export const ValidationContext = React.createContext({
    getMessagesForField: (_field: string) => [],
    getMessagesForFields: () => [],
    getFieldClasses: (_field: string) => '',
    isFormSubmitted: () => false,
    isFormValid: () => false
});
