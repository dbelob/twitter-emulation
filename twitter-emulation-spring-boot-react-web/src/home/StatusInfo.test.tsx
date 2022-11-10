import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusInfo from './StatusInfo';
import { UserState } from '../common/models/UserState';

describe('StatusInfoComponent', () => {
    test('should create', () => {
        const userState = new UserState();

        render(<StatusInfo userState={userState}/>);
        expect(screen.getByText(/^© Acme,/)).toBeTruthy();
    });

    test('receives the user state through input property', () => {
        const userState = new UserState();

        render(<StatusInfo userState={userState}/>);
        expect(screen.queryByTestId('state')).toBeNull();
        
        //TODO: implement
    });
});
