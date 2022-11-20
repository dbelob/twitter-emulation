import 'reflect-metadata';
import { expect, test } from '@playwright/experimental-ct-react';
import App from '../src/App';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { AccountService } from '../src/common/services/AccountService';
import { AuthenticationService } from '../src/common/services/AuthenticationService';
import { FollowerService } from '../src/common/services/FollowerService';
import { MessageService } from '../src/message/MessageService';
import { TweetService } from '../src/common/services/TweetService';

test.describe('App', () => {
    const iocContainer = new Container();
    iocContainer.bind(AccountService).toSelf().inSingletonScope();
    iocContainer.bind(AuthenticationService).toSelf().inSingletonScope();
    iocContainer.bind(FollowerService).toSelf().inSingletonScope();
    iocContainer.bind(MessageService).toSelf().inSingletonScope();
    iocContainer.bind(TweetService).toSelf().inSingletonScope();

    const server = setupServer(
        rest.get('/api/authentication/user', (req, res, ctx) => {
            return res(
                ctx.status(200)
            )
        }),
    );

    test.beforeAll(() => server.listen())
    test.afterEach(() => server.resetHandlers())
    test.afterAll(() => server.close())

    test.use({viewport: {width: 500, height: 500}});

    test('should display login page', async ({mount}) => {
        const component = await mount(
            <Provider container={iocContainer}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        await expect(component).toContainText('Log in');
    });
});
