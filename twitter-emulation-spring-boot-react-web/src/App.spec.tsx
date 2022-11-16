import 'reflect-metadata';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import { AccountService } from './common/services/AccountService';
import { AuthenticationService } from './common/services/AuthenticationService';
import { FollowerService } from './common/services/FollowerService';
import { MessageService } from './message/MessageService';
import { TweetService } from './common/services/TweetService';

const iocContainer = new Container();
iocContainer.bind(AccountService).toSelf().inSingletonScope();
iocContainer.bind(AuthenticationService).toSelf().inSingletonScope();
iocContainer.bind(FollowerService).toSelf().inSingletonScope();
iocContainer.bind(MessageService).toSelf().inSingletonScope();
iocContainer.bind(TweetService).toSelf().inSingletonScope();

test.use({viewport: {width: 500, height: 500}});

test('should work', async ({mount}) => {
    const component = await mount(
        <Provider container={iocContainer}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    );
    await expect(component).toContainText('Learn React');
});
