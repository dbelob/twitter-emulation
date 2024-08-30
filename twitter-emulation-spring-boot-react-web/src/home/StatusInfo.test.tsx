import { render, screen, within } from '@testing-library/react';
import StatusInfo from './StatusInfo';
import { UserState } from '../common/models/UserState';

describe('StatusInfoComponent', () => {
    test('should create', () => {
        const userState = new UserState();

        render(<StatusInfo userState={userState}/>);
        expect(screen.getByText(/^© Acme,/)).toBeTruthy();
    });

    test('receives the user state through input property', () => {
        let userState = new UserState();
        const {rerender} = render(<StatusInfo userState={userState}/>);
        expect(screen.queryByTestId('logged')).toBeNull();
        expect(screen.queryByTestId('username')).toBeNull();

        userState = new UserState('jsmith', 'jsmith');
        rerender(<StatusInfo userState={userState}/>);
        expect(screen.getByTestId('logged')).not.toBeNull();
        expect(within(screen.getByTestId('username')).getByText('jsmith')).toBeInTheDocument();

        userState = new UserState('jsmith', 'jdoe');
        rerender(<StatusInfo userState={userState}/>);
        expect(screen.getByTestId('logged')).not.toBeNull();
        expect(within(screen.getByTestId('username')).getByText('jsmith')).toBeInTheDocument();

        userState = new UserState('jdoe', 'jdoe');
        rerender(<StatusInfo userState={userState}/>);
        expect(screen.getByTestId('logged')).not.toBeNull();
        expect(within(screen.getByTestId('username')).getByText('jdoe')).toBeInTheDocument();

        userState = new UserState('jdoe', 'jsmith');
        rerender(<StatusInfo userState={userState}/>);
        expect(screen.getByTestId('logged')).not.toBeNull();
        expect(within(screen.getByTestId('username')).getByText('jdoe')).toBeInTheDocument();
    });
});
