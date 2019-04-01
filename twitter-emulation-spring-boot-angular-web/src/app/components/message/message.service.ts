import { Injectable } from "@angular/core";
import { Message } from "./message.model";
import { Observable, Subject } from "rxjs";

@Injectable()
export class MessageService {
  private subject = new Subject<Message>();

  reportMessage(msg: Message) {
    this.subject.next(msg);
  }

  get messages(): Observable<Message> {
    return this.subject;
  }

  getMessageText(response: Response): string {
    console.log(JSON.stringify(response));

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
