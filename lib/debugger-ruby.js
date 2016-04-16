'use babel';

import View from './view';
import Debugger from './components/debugger'

import { CompositeDisposable } from 'atom';

export default {

  view: null,
  panel: null,
  subscriptions: null,

  activate(state) {
    this.debugger = new Debugger();

    this.view = new View(state.viewState);
    this.panel = atom.workspace.addBottomPanel({
      item: this.view.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'debugger-ruby:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.panel.destroy();
    this.subscriptions.dispose();
    this.view.destroy();
  },

  serialize() {
    return {
      viewState: this.view.serialize()
    };
  },

  toggle() {
    return (this.panel.isVisible() ? this.panel.hide() : this.panel.show());
  }

};
