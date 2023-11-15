import axios, { AxiosError, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { Buffer } from 'buffer';
import { inject, injectable } from 'inversify';
import { MessageService } from '../../message/MessageService';
import { User } from '../models/User';

@injectable()
export class AuthenticationService {
    private readonly baseUrl = '/api/authentication';
    private authenticated = false;

    @inject(MessageService)
    private readonly messageService!: MessageService;

    authenticate(credentials: any, successCallback?: () => void, errorCallback?: () => void) {
        const headers: RawAxiosRequestHeaders = credentials ? {
            authorization: 'Basic ' + Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')
        } : {};

        axios.get(`${this.baseUrl}/user`, {headers})
            .then(response => {
                if (response.data['name']) {
                    this.authenticated = true;
                    if (successCallback) {
                        successCallback();
                    }
                } else {
                    this.authenticated = false;
                    if (errorCallback) {
                        errorCallback();
                    }
                }
            })
            .catch((error: AxiosError) => {
                this.authenticated = false;
                if (errorCallback) {
                    errorCallback();
                }
            });
    }

    logout(finallyCallback?: () => void) {
        axios.post(`${this.baseUrl}/logout`)
            .finally(() => {
                this.authenticated = false;
                if (finallyCallback) {
                    finallyCallback();
                }
            });
    }

    getUser(thenCallback: (response: AxiosResponse<User>) => void) {
        axios.get(`${this.baseUrl}/user`)
            .then(response => {
                thenCallback(response);
            })
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }
}
