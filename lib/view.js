'use babel';

import rivets from 'rivets'

import Main from './components/main'

export default class View {

  constructor(serializedState) {
    this.element = document.createElement('div');
    this.element.classList.add('debugger-ruby');

    rivets.init('debugger-main', this.element, {});
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
