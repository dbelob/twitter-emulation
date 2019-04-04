import { Injectable } from "@angular/core";
import { Message } from "./message.model";
import { Observable, Subject } from "rxjs";

@Injectable()
export class MessageService {
  private subject = new Subject<Message>();

  reportMessage(response: Response) {
    let msg = new Message(MessageService.getMessageText(response), new Date(), true);

    this.subject.next(msg);
  }

  get messages(): Observable<Message> {
    return this.subject;
  }

  private static getMessageText(response: Response): string {
    let error = response['error'];

    if (error) {
      let customMessage = error['customMessage'];

      if (customMessage) {
        return customMessage;
      }
    }

    return `Network Error: ${response.statusText} (${response.status})`;
  }
}
