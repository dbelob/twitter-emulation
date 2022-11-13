import 'reflect-metadata';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act, cleanup, render, screen, within } from '@testing-library/react';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
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
        rest.get('/api/account/statistics/jsmith', (req, res, ctx) => {
            return res(ctx.json({
                username: 'jsmith', description: 'John Smith', tweetsCount: 6, followingCount: 2,
                followersCount: 1, follow: false
            }))
        }),
        rest.get('/api/account/statistics/jdoe', (req, res, ctx) => {
            return res(ctx.json({
                username: 'jdoe', description: 'John Doe', tweetsCount: 3, followingCount: 1,
                followersCount: 1, follow: true
            }))
        }),
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('should create', async () => {
        const userState = new UserState('jsmith', 'jsmith');

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

        cleanup();

        userState = new UserState('jsmith', 'jdoe');
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
    });
});
