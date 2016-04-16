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
  }

  start() {
    this.client.onPaused(function() {
      console.log(arguments);
    })

    this.client.onDisconnected(function() {
        atom.notifications.addInfo('Debugger disconnected', { dismissable: true})
    });
  }

  stop() {
    this.client.disconnect();
    this.client.destroy();
  }
}
