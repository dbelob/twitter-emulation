import { Observable, Subject } from 'rxjs';
import { AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import { Message } from '../common/models/Message';

@injectable()
export class MessageService {
    private subject = new Subject<Message>();

    reportMessage(parameter: Message | AxiosResponse | undefined) {
        let msg = (parameter instanceof Message) ?
            parameter :
            new Message(MessageService.getMessageText(parameter), new Date(), true);

        this.subject.next(msg);
    }

    get messages(): Observable<Message> {
        return this.subject;
    }

    private static getMessageText(response?: AxiosResponse): string {
        if (response) {
            let data = response.data;

            if (data) {
                let customMessage = data['customMessage'];

                if (customMessage) {
                    return customMessage;
                }
            }

            return `Network Error: ${response.statusText} (${response.status})`;
        } else {
            return 'Unknown Error';
        }
    }
}
