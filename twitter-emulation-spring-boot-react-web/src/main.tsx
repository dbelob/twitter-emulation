import 'reflect-metadata';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import dateTransformer from 'axios-date-reviver';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import { AccountService } from './common/services/AccountService';
import { AuthenticationService } from './common/services/AuthenticationService';
import { FollowerService } from './common/services/FollowerService';
import { MessageService } from './message/MessageService';
import { TweetService } from './common/services/TweetService';

axios.defaults.transformResponse = [dateTransformer];

const iocContainer = new Container();
iocContainer.bind(AccountService).toSelf().inSingletonScope();
iocContainer.bind(AuthenticationService).toSelf().inSingletonScope();
iocContainer.bind(FollowerService).toSelf().inSingletonScope();
iocContainer.bind(MessageService).toSelf().inSingletonScope();
iocContainer.bind(TweetService).toSelf().inSingletonScope();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider container={iocContainer}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);
