'use babel';
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
    this.debugger.start();

    this.view = new View(state.viewState, this.debugger);
    this.panel = atom.workspace.addBottomPanel({
      item: this.view.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'debugger-ruby:toggle': () => this.toggle(),
      'debugger-ruby:add-breakpoint': () => this.addBreakpoint(),
    }));

    // Decorators
    // var pane = atom.workspace.getActivePane();
    // this.subscriptions.add(pane.onDidAddItem((event) => { console.log(event.item.getPath()); }));
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
  },

  addBreakpoint() {
    if (this.debugger.isConnected()) {
      var editor = atom.workspace.getActiveTextEditor();
      var path = editor.getPath();
      var lineNumber = editor.getSelectedBufferRange().start.row + 1;

      this.debugger.client.addBreakpoint(path, lineNumber);

      // decorate line
      editor.decorateMarker(editor.markBufferRange(editor.getSelectedBufferRange()), { type: 'line-number', class:'decoration-breakpoint' });
    } else {
      atom.notifications.addInfo('Connect the debugger before adding breakpoints', { dismissable: true})
    }
  }

};
