'use babel';

import _ from 'lodash';
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
        name: 'pause', from: ['running', 'connected'], to: 'paused' }, {
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
      var editor = atom.workspace.open(breakpoint.file, {initialLine: breakpoint.line - 1});
      this.state.pause();
      this.client.localVariables()
        .then((variables) => {
          this.variables = variables;
          this.client.events.emit('variablesChanged');
        });
    });

    this.client.events.on('breakpointAdded', (num, location) => {
      this.breakpoints.push({ id: num, location: location, enabled: true });
      this.client.events.emit('breakpointChanged');
    });

    this.client.events.on('breakpointDeleted', (num) => {
      _.remove(this.breakpoints, (breakpoint) => breakpoint.id === num);
      this.client.events.emit('breakpointChanged');
    });

    this.client.events.on('breakpointEnabled', (num) => {
      var breakpoint = _.find(this.breakpoints, (breakpoint) => breakpoint.id === num);
      if (breakpoint) {
        breakpoint.enabled = true;
        this.client.events.emit('breakpointChanged');
      }
    });

    this.client.events.on('breakpointDisabled', (num) => {
      var breakpoint = _.find(this.breakpoints, (breakpoint) => breakpoint.id === num);
      if (breakpoint) {
        breakpoint.enabled = false;
        this.client.events.emit('breakpointChanged');
      }

      this.client.events.emit('breakpointChanged');
    });
  }

  stop() {
    this.client.disconnect();
    this.client.destroy();
  }

  connect() {
    this.client.connect()
      .then(() => {
        this.state.connect();
        this.client.start();
      })
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
    this.state.continue();
  }

  isConnected() {
    return this.state.current !== 'disconnected';
  }

  isDisconnected() {
    return this.state.current === 'disconnected';
  }

  isPaused() {
    return this.state.current === 'paused';
  }

  removeBreakpoint(breakpointId) {
    this.client.removeBreakpoint(breakpointId);
  }

  enableBreakpoint(breakpointId) {
    this.client.enableBreakpoint(breakpointId);
  }

  disableBreakpoint(breakpointId) {
    this.client.disableBreakpoint(breakpointId);
  }
}
