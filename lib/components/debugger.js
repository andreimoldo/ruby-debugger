'use babel';

import StateMachine from 'javascript-state-machine'

import Client from './client'

export default class Debugger {

  constructor(data) {
    this.client = new Client();

    this.state = StateMachine.create({
      initial: 'disconnected',
      events: [{
        name: 'connect', from: 'disconnected', to: 'connected' }, {
        name: 'start', from: 'connected', to: 'running' }, {
        name: 'pause', from: 'running', to: 'paused' }, {
        name: 'continue', from: 'paused', to: 'running' }, {
        name: 'disconnect', from: '*', to: 'disconnected' }]
    });

    this.breakpoints = [];
    this.stack = [];
    this.variables = [];
  }

  start() {
    this.client.onDisconnected(() => {
        this.state.disconnect();
        atom.notifications.addInfo('Debugger disconnected', { dismissable: true})
    });

    this.client.onPaused((breakpoint) => {
      var editor = atom.workspace.open(breakpoint.file);
      this.state.pause();
      this.client.localVariables()
        .then(() => {
          console.log('jere');
        });
    });

    this.client.events.on('breakpointAdded', (num, location) => {
      this.breakpoints.push({num, location});
    });
  }

  stop() {
    this.client.disconnect();
    this.client.destroy();
  }

  connect() {
    this.client.connect()
      .then(() => this.state.connect())
      .catch(function(e) {
        console.log(e);
      })
  }

  disconnect() {
    this.client.disconnect();
    this.state.disconnect();
  }

  play() {
    this.client.play();
    this.state.start();
  }

  isConnected() {
    return this.state.current !== 'disconnected';
  }
}
