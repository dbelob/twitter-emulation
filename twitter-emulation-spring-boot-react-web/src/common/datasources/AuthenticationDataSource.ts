import { AxiosError, AxiosRequestHeaders } from 'axios';
import { Axios } from 'axios-observable';
import { inject, injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessageService } from '../MessageService';

@injectable()
export class AuthenticationDataSource {
    private readonly baseUrl = '/api/authentication';
    private authenticated = false;

    @inject(MessageService)
    private readonly messageService!: MessageService;

    authenticate(credentials: any, success?: () => void, error?: () => void): Observable<boolean> {
        const headers: AxiosRequestHeaders = credentials ? {
            authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
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
}
