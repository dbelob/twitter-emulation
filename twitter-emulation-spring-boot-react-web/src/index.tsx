import 'reflect-metadata';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import { FollowerDataSource } from './common/FollowerDataSource';
import { MessageService } from './common/MessageService';
import { TweetDataSource } from './common/TweetDataSource';
import { Axios } from 'axios-observable';
import dateTransformer from 'axios-date-reviver';

Axios.defaults.transformResponse = [dateTransformer]

const iocContainer = new Container();
iocContainer.bind(FollowerDataSource).toSelf().inSingletonScope();
iocContainer.bind(MessageService).toSelf().inSingletonScope();
iocContainer.bind(TweetDataSource).toSelf().inSingletonScope();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Provider container={iocContainer}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
