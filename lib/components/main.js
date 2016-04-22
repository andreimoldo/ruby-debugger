'use babel';

import rivets from 'rivets'

export default class Main {

  constructor(context) {
    this.context = context;
  }

  // Event handlers
  onClickStatus(event, main) {
    var state = main.context.state.current;
    if (state === 'disconnected') {
      main.context.start();
      main.context.connect();
    } else if (state === 'connected') {
      main.context.play()
    } else {
      main.context.disconnect();
    }
  }

  onClickPlay(event, main) {
    main.context.state.continue();
    main.context.client.play();
  }

  onClickDeleteBreakpoint(event, main) {
    console.log(event, main.breakpoint);
  }

  // States
  isConnected() {
    return this.context.state.current !== 'disconnected';
  }

  isDisconnected() {
    return this.context.state.current === 'disconnected';
  }
}

// Rivets binders
rivets.binders['button-status'] = {
  bind: function(el) {
    var state = this.observer.value();
    if (state === 'disconnected') {
      el.textContent = 'Connect';
    } else if(state === 'connected') {
      el.textContent = 'Run';
    } else {
      el.textContent = 'Disconnect';
    }
  },

  unbind: function(el) {},

  routine: function(el, value) {
    if (value === 'disconnected') {
      el.textContent = 'Connect';
    } else if (value === 'connected') {
      el.textContent = 'Run';
    } else {
      el.textContent = 'Disconnect';
    }
  }
}

rivets.binders['button-debugger-action'] = {
  bind: function(el) {
    var state = this.observer.value();
    el.disabled = state !== 'paused';
  },

  unbind: function(el) {},

  routine: function(el, value) {
    el.disabled = value !== 'paused';
  }
}
