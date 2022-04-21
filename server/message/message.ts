import { State } from "../message-state/interface.state";

export default class Message {
  object: string;
  content: string;
  sendDate: Date;
  sendHour: Date;
  state: State = State.BROU;

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

  changeState = (msg: Message, state: State) => {
    msg.state = state;
  };

  send = () => {
    this.state = State.PRET;
  };
}
