import axios, { AxiosError, RawAxiosRequestHeaders } from 'axios';
import { Buffer } from 'buffer';
import { inject, injectable } from 'inversify';
import { MessageService } from '../../message/MessageService';
import { User } from '../models/User';

@injectable()
export class AuthenticationService {
    private readonly baseUrl = '/api/authentication';

    @inject(MessageService)
    private readonly messageService!: MessageService;

    authenticate(credentials: any, successCallback?: () => void, errorCallback?: () => void) {
        const headers: RawAxiosRequestHeaders = credentials ? {
            authorization: 'Basic ' + Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')
        } : {};

        axios.get(`${this.baseUrl}/user`, {headers})
            .then(response => {
                if (response.data['name']) {
                    if (successCallback) {
                        successCallback();
                    }
                } else {
                    if (errorCallback) {
                        errorCallback();
                    }
                }
            })
            .catch(() => {
                if (errorCallback) {
                    errorCallback();
                }
            });
    }

    logout(finallyCallback?: () => void) {
        axios.post(`${this.baseUrl}/logout`)
            .finally(() => {
                if (finallyCallback) {
                    finallyCallback();
                }
            });
    }

    getUser() {
        return axios.get<User>(`${this.baseUrl}/user`)
            .catch((error: AxiosError) => {
                this.messageService.reportMessage(error);
                throw error;
            });
    }
}
