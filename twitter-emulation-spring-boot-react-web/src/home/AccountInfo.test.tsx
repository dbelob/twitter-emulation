import 'reflect-metadata';
import { BrowserRouter } from 'react-router-dom';
import { act, cleanup, render, screen, within } from '@testing-library/react';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import AccountInfo from './AccountInfo';
import { UserState } from '../common/models/UserState';
import { AccountService } from '../common/services/AccountService';
import { FollowerService } from '../common/services/FollowerService';
import { MessageService } from '../message/MessageService';

describe('AccountInfoComponent', () => {
    const iocContainer = new Container();
    iocContainer.bind(AccountService).toSelf().inSingletonScope();
    iocContainer.bind(FollowerService).toSelf().inSingletonScope();
    iocContainer.bind(MessageService).toSelf().inSingletonScope();

    const server = setupServer(
        http.get('/api/account/statistics/jsmith', () => {
            return HttpResponse.json({
                username: 'jsmith', description: 'John Smith', tweetsCount: 6, followingCount: 2,
                followersCount: 1, follow: false
            });
        }),
        http.get('/api/account/statistics/jdoe', () => {
            return HttpResponse.json({
                username: 'jdoe', description: 'John Doe', tweetsCount: 3, followingCount: 1,
                followersCount: 1, follow: true
            });
        }),
        http.get('/api/account/statistics/rroe', () => {
            return HttpResponse.json({
                username: 'rroe', description: 'Richard Roe', tweetsCount: 0, followingCount: 0,
                followersCount: 1, follow: false
            });
        })
    );

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('should create', async () => {
        const userState = new UserState('jsmith', 'jsmith');

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(() => {
            render(
                <Provider container={iocContainer}>
                    <BrowserRouter>
                        <AccountInfo userState={userState}/>
                    </BrowserRouter>
                </Provider>);
        });
        expect(screen.getByText(/^@/)).toBeTruthy();
    });

    test('receives the user state through input property', async () => {
        let userState = new UserState('jsmith', 'jsmith');
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            render(
                <Provider container={iocContainer}>
                    <BrowserRouter>
                        <AccountInfo userState={userState}/>
                    </BrowserRouter>
                </Provider>);
        });
        expect(within(screen.getByTestId('description')).getByText('John Smith')).toBeInTheDocument();
        expect(within(screen.getByTestId('username')).getByText('@jsmith')).toBeInTheDocument();
        expect(screen.queryByTestId('buttons')).not.toBeInTheDocument();
        expect(screen.queryByTestId('unfollow')).not.toBeInTheDocument();
        expect(screen.queryByTestId('follow')).not.toBeInTheDocument();
        expect(within(screen.getByTestId('tweets')).getByText('6')).toBeInTheDocument();
        expect(within(screen.getByTestId('following')).getByText('2')).toBeInTheDocument();
        expect(within(screen.getByTestId('followers')).getByText('1')).toBeInTheDocument();

        cleanup();

        userState = new UserState('jsmith', 'jdoe');
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            render(
                <Provider container={iocContainer}>
                    <BrowserRouter>
                        <AccountInfo userState={userState}/>
                    </BrowserRouter>
                </Provider>);
        });
        expect(within(screen.getByTestId('description')).getByText('John Doe')).toBeInTheDocument();
        expect(within(screen.getByTestId('username')).getByText('@jdoe')).toBeInTheDocument();
        expect(screen.getByTestId('buttons')).toBeInTheDocument();
        expect(screen.getByTestId('unfollow')).toBeInTheDocument();
        expect(screen.queryByTestId('follow')).not.toBeInTheDocument();
        expect(within(screen.getByTestId('tweets')).getByText('3')).toBeInTheDocument();
        expect(within(screen.getByTestId('following')).getByText('1')).toBeInTheDocument();
        expect(within(screen.getByTestId('followers')).getByText('1')).toBeInTheDocument();

        cleanup();

        userState = new UserState('jsmith', 'rroe');
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            render(
                <Provider container={iocContainer}>
                    <BrowserRouter>
                        <AccountInfo userState={userState}/>
                    </BrowserRouter>
                </Provider>);
        });
        expect(within(screen.getByTestId('description')).getByText('Richard Roe')).toBeInTheDocument();
        expect(within(screen.getByTestId('username')).getByText('@rroe')).toBeInTheDocument();
        expect(screen.getByTestId('buttons')).toBeInTheDocument();
        expect(screen.queryByTestId('unfollow')).not.toBeInTheDocument();
        expect(screen.getByTestId('follow')).toBeInTheDocument();
        expect(within(screen.getByTestId('tweets')).getByText('0')).toBeInTheDocument();
        expect(within(screen.getByTestId('following')).getByText('0')).toBeInTheDocument();
        expect(within(screen.getByTestId('followers')).getByText('1')).toBeInTheDocument();
    });
});
