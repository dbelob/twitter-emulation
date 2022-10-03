import { AxiosError, AxiosRequestHeaders } from 'axios';
import { Axios, AxiosObservable } from 'axios-observable';
import { Buffer } from 'buffer';
import { inject, injectable } from 'inversify';
import { finalize, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessageService } from '../MessageService';
import { User } from '../models/User';

@injectable()
export class AuthenticationDataSource {
    private readonly baseUrl = '/api/authentication';
    private authenticated = false;

    @inject(MessageService)
    private readonly messageService!: MessageService;

    authenticate(credentials: any, success?: () => void, error?: () => void): Observable<boolean> {
        const headers: AxiosRequestHeaders = credentials ? {
            authorization: 'Basic ' + Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')
        } : {};

        return Axios.get(`${this.baseUrl}/user`, {headers})
            .pipe(
                map(response => {
                        if (response.data['name']) {
                            this.authenticated = true;
                            if (success) {
                                success();
                            }
                            return true;
                        } else {
                            this.authenticated = false;
                            if (error) {
                                error();
                            }
                            return false;
                        }
                    }
                ),
                catchError((err: AxiosError) => {
                    this.authenticated = false;
                    if (error) {
                        error();
                    }
                    return of(false)
                })
            );
    }

    logout(callback?: () => void) {
        Axios.post('/logout')
            .pipe(
                finalize(() => {
                    this.authenticated = false;
                    if (callback) {
                        callback();
                    }
                })
            ).subscribe();
    }

    getUser(): AxiosObservable<User> {
        return Axios.get(`${this.baseUrl}/user`)
            .pipe(
                catchError((err: AxiosError) => {
                    this.messageService.reportMessage(err.response);
                    throw err;
                })
            );
    }
}
