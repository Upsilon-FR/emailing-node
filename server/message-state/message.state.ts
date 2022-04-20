enum State {
  BROU = 1,
  AVAL = 2,
  PRET = 3,
  ENVO = 4,
}

export default class MessageState {
  state: State;

  constructor(state: State) {
    this.state = state;
  }
}
