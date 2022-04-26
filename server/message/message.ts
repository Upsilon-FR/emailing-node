"use strict";
import { State } from "../message-state/interface.state";

export default class Message {
  object: string;
  content: string;
  sendDate: string;
  sendHour: string;
  state: State = State.BROU;

  constructor(object: string, content: string, sendDate: string, sendHour: string) {
    this.object = object;
    this.content = content;
    this.sendDate = sendDate;
    this.sendHour = sendHour;
  }
}
