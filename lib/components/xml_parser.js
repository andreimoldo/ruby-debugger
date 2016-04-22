'use babel';

import EventEmitter from 'events'
import sax from 'sax'

export default class XmlParser {

  constructor() {
    var options, stack, strict;
    this.events = new EventEmitter();
    strict = true;
    options = {
      trim: true
    };
    stack = [];
    this.parser = sax.parser(strict, options);
    this.parser.onerror = function(e) {
      throw e;
    };
    this.parser.onend = function() {};
    this.parser.ontext = function(text) {
      var node;
      node = stack[stack.length - 1];
      if (node.text == null) {
        node.text = '';
      }
      node.text += text;
    };
    this.parser.onopentag = function(node) {
      stack.push(node);
    };
    this.parser.onclosetag = (function(_this) {
      return function(name) {
        var node, object, parent, ref, result;
        node = stack.pop();
        object = {};
        if (Object.keys(node.attributes).length) {
          object.attrs = node.attributes;
        }
        if ((ref = node.children) != null ? ref.length : void 0) {
          object.children = node.children;
        }
        if (node.text) {
          object.text = node.text;
        }
        result = {};
        result[node.name] = object;
        if (stack.length === 1) {
          _this.events.emit('command', result);
        } else {
          parent = stack[stack.length - 1];
          if (parent.children == null) {
            parent.children = [];
          }
          parent.children.push(result);
        }
      };
    })(this);
    this.parser.write("<root>");
  }

  write(text) {
    return this.parser.write(text);
  }

  onCommand(cb) {
    return this.events.on('command', cb);
  }

  destroy() {
    return this.events.removeAllListeners();
  }
}
