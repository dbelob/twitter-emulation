import { Injectable } from "@angular/core";
import { Message } from "./message.model";
import { Observable, Subject } from "rxjs";

@Injectable()
export class MessageService {
  private subject = new Subject<Message>();
  private exceptionMessages = new Map<string, string>();

  constructor() {
    this.exceptionMessages.set('AccountExistsException', 'Account with the same name already exists');
  }

  reportMessage(msg: Message) {
    this.subject.next(msg);
  }

  get messages(): Observable<Message> {
    return this.subject;
  }

  getMessageText(response: Response): string {
    let error = response['error'];

    if (error) {
      let trace = error['trace'];

      for (let key of Array.from(this.exceptionMessages.keys())) {
        let value = this.exceptionMessages.get(key);

        if (trace.indexOf(key) != -1) {
          return value;
        }
      }
    }

    return `Network Error: ${response.statusText} (${response.status})`;
  }
}
