'use babel';

import fs from 'fs'
import rivets from 'rivets'

import Main from './components/main'

export default class View {

  constructor(serializedState, context) {
    this.element = document.createElement('div');
    this.element.classList.add('debugger-ruby');

    this.view = rivets.init('debugger-main', this.element, { context });
  }

  serialize() {}

  destroy() {
    this.element.remove();
    this.view.unbind();
  }

  getElement() {
    return this.element;
  }

}

rivets.components['debugger-main'] = {
  template: function() {
    return fs.readFileSync(require.resolve('../templates/debugger.html'))
  },

  initialize: function(el, { context }) {
    return new Main(context);
  }

}
