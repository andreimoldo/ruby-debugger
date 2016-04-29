'use babel';

import React from 'react-lite'

import Main from './components/main'

export default class View {

  constructor(serializedState, context) {
    this.element = document.createElement('div');
    this.element.classList.add('debugger-ruby');

    React.render(<Main debugger={context} />, this.element);
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
