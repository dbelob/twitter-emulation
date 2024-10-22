export class Message {
  constructor(public text: string,
              public date: Date,
              public error = false) {
  }
}
