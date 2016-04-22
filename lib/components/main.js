'use babel';

export default class Main {
  constructor(context) {
    this.context = context;
  }

  onClickConnect() {
    console.log('click');
  }

  textConnectButton() {
    return this.context.state.current === 'disconnected' ? 'Connect' : 'Disconnect'
  }
}
