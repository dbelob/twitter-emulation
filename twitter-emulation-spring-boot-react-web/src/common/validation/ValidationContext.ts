import React from 'react';

export const ValidationContext = React.createContext({
    getMessagesForField: (field: string) => [],
    getMessagesForFields: () => [],
    getFieldClasses: (field: string) => ''
});
