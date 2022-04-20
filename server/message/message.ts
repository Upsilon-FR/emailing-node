/* enum Etat {
  "ATE",
  "FIN",
}

enum Type_Probleme {
  "serrurerie",
  "plomberie",
} */

export default class Message {
  object: string;
  content: string;
  sendDate: Date;
  sendHour: Date;

  constructor(object: string, content: string, sendDate: Date, sendHour: Date) {
    this.object = object;
    this.content = content;
    this.sendDate = sendDate;
    this.sendHour = sendHour;
  }

  updateMsg = (msg: Message, content: string) => {
    if (msg.content !== content) msg.content = content;
    return msg;
  };
}
