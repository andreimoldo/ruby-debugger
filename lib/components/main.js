'use babel';

import fs from 'fs'
import rivets from 'rivets'

export default class Main {
  constructor() {

  }
}

rivets.components['debugger-main'] = {
  template: function() {
    return fs.readFileSync(require.resolve('../../templates/debugger.html'))
  },

  initialize: function(el, data) {
    new Main(data)
  }
}
