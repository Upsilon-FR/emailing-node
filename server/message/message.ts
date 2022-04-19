/* enum Etat {
  "ATE",
  "FIN",
}

enum Type_Probleme {
  "serrurerie",
  "plomberie",
} */

export default class Message {
  object: String;
  content: String;
  sendDate: Date;
  sendHour: Date;

  constructor(object: String, content: String, sendDate: Date, sendHour: Date) {
    this.object = object;
    this.content = content;
    this.sendDate = sendDate;
    this.sendHour = sendHour;
  }
}
