import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import axios from 'axios';
import { container } from 'inversify-hooks';
import { AccountService } from './common/services/AccountService';
import { AuthenticationService } from './common/services/AuthenticationService';
import { FollowerService } from './common/services/FollowerService';
import { MessageService } from './message/MessageService';
import { TweetService } from './common/services/TweetService';
import dateTransformer from './common/AxiosDateReviver.ts';

axios.defaults.transformResponse = [dateTransformer];

container.addSingleton<AccountService>(AccountService);
container.addSingleton<AuthenticationService>(AuthenticationService);
container.addSingleton<FollowerService>(FollowerService);
container.addSingleton<MessageService>(MessageService);
container.addSingleton<TweetService>(TweetService);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>,
);
