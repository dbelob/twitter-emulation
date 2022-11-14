import 'reflect-metadata';
import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import { MessageService } from './MessageService';
import MessageText from './MessageText';
import { Message } from '../common/models/Message';

describe('MessageTextComponent', () => {
    const iocContainer = new Container();
    iocContainer.bind(MessageService).toSelf().inSingletonScope();

    test('should create', () => {
        render(
            <Provider container={iocContainer}>
                <MessageText/>
            </Provider>
        );
        expect(screen.queryByTestId('message')).not.toBeInTheDocument();
    });

    test('checks visibility', async () => {
        const messageService = iocContainer.get(MessageService)

        render(
            <Provider container={iocContainer}>
                <MessageText/>
            </Provider>
        );
        expect(screen.queryByTestId('message')).not.toBeInTheDocument();

        await act(async () => {
            messageService.reportMessage(new Message('Message', new Date(), true));
        });
        expect(screen.queryByTestId('message')).toBeInTheDocument();
    });

    test('displays message text', async () => {
        const messageService = iocContainer.get(MessageService)

        render(
            <Provider container={iocContainer}>
                <MessageText/>
            </Provider>
        );
        expect(screen.queryByTestId('message')).not.toBeInTheDocument();

        await act(async () => {
            messageService.reportMessage(new Message('Message 1', new Date(), true));
        });
        expect(screen.queryByTestId('message')).toBeInTheDocument();
        expect(within(screen.getByTestId('message')).getByText('Message 1')).toBeInTheDocument();

        await act(async () => {
            messageService.reportMessage(new Message('Message 2', new Date(), true));
        });
        expect(screen.queryByTestId('message')).toBeInTheDocument();
        expect(within(screen.getByTestId('message')).getByText('Message 2')).toBeInTheDocument();

        await act(async () => {
            messageService.reportMessage(new Message('Message 3', new Date(), true));
        });
        expect(screen.queryByTestId('message')).toBeInTheDocument();
        expect(within(screen.getByTestId('message')).getByText('Message 3')).toBeInTheDocument();

        await act(async () => {
            messageService.reportMessage(undefined);
        });
        expect(screen.queryByTestId('message')).toBeInTheDocument();
        expect(within(screen.getByTestId('message')).getByText('Unknown Error')).toBeInTheDocument();
    });
});
