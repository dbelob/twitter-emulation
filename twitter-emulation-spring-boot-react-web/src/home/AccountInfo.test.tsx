import 'reflect-metadata';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
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
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('should create', async () => {
        const userState = new UserState('jsmith', 'jsmith');

        render(
            <Provider container={iocContainer}>
                <BrowserRouter>
                    <AccountInfo userState={userState}/>
                </BrowserRouter>
            </Provider>);
        await expect(screen.getByText(/^@/)).toBeTruthy();
    });

    test('receives the user state through input property', () => {
        //TODO: implement
    });

    test('receives the account statistics through input property', () => {
        //TODO: implement
    });

    test('receives the account statistics and user state through input property', () => {
        //TODO: implement
    });
});
