'use babel';

import _ from 'underscore-plus';
import EventEmitter from 'events'
import net from 'net'
import q from 'q'

import XmlParser from './xml_parser.js'

export default class Client {

  constructor() {
    this.host = '127.0.0.1';
    this.port = atom.config.get('debugger-ruby.port') || 1234;
    this.socket = null;
    this.events = new EventEmitter();
    this.deferreds = [];
    this.cmdParser = new XmlParser();
    this.cmdParser.onCommand((command) => this.handleCmd(command));
  }

  onDisconnected(cb) {
    return this.events.on('disconnected', cb);
  }

  onPaused(cb) {
    return this.events.on('paused', cb);
  }

  connect() {
    var deferred;
    deferred = q.defer();
    this.socket = net.connect(this.port, this.host);
    this.socket.on('connect', deferred.resolve);
    this.socket.on('error', deferred.reject);
    this.socket.on('data', (data) => this.cmdParser.write(data.toString()));
    this.socket.on('close', () => {
      this.socket = null;
      this.events.emit('disconnected');
    });
    return deferred.promise;
  }

  disconnect() {
    return this.runCmd('exit');
  }

  start() {
    return this.runCmd('start');
  }

  stepIn() {
    return this.runCmd('step');
  }

  stepOut() {
    return this.runCmd('finish');
  }

  stepOver() {
    return this.runCmd('next');
  }

  play() {
    return this.runCmd('cont');
  }

  pause() {
    return this.runCmd('pause');
  }

  backtrace() {
    return this.runCmdWithResponse('backtrace');
  }

  addBreakpoint(scriptPath, lineNumber) {
    return this.runCmdWithResponse('break', scriptPath + ":" + lineNumber);
  }

  localVariables() {
    return this.runCmdWithResponse('var local');
  }

  globalVariables() {
    return this.runCmdWithResponse('var global');
  }

  runCmd(cmd, arg) {
    if (arg) {
      return this.socket.write(cmd + " " + arg + "\n");
    } else {
      return this.socket.write(cmd + "\n");
    }
  }

  runCmdWithResponse() {
    var deferred;
    this.deferreds.push(deferred = q.defer());
    this.runCmd.apply(this, arguments);
    return deferred.promise;
  }

  handleCmd(command) {
    var data, method, name;
    name = Object.keys(command)[0];
    data = command[name];
    method = "handle" + _.capitalize(name) + "Cmd";
    console.log(method);
    return typeof this[method] === "function" ? this[method](data) : void 0;
  }

  handleBreakpointAddedCmd(data) {
    var location, num;
    num = data.attrs.no;
    location = data.attrs.location;
    this.deferreds.shift().resolve(data);
    return this.events.emit('breakpointAdded', num, location);
  }

  handleBreakpointCmd(data) {
    return this.handleSuspendedCmd(data);
  }

  handleSuspendedCmd(data) {
    var breakpoint, file, line;
    file = data.attrs.file;
    line = parseInt(data.attrs.line);
    breakpoint = {
      file: file,
      line: line
    }
    return this.events.emit('paused', breakpoint);
  }

  handleFramesCmd(data) {
    var attrs, entry, frames;
    frames = (function() {
      var i, len, ref, results;
      ref = data.children;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        entry = ref[i];
        attrs = entry.frame.attrs;
        attrs.line = parseInt(attrs.line);
        results.push(attrs);
      }
      return results;
    })();
    return this.deferreds.shift().resolve(frames);
  }

  handleVariablesCmd(data) {
    var attrs, entry, vars;
    vars = (function() {
      var i, len, ref, results;
      ref = data.children || [];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        entry = ref[i];
        attrs = entry.variable.attrs;
        attrs.hasChildren = attrs.hasChildren === 'true';
        results.push(attrs);
      }
      return results;
    })();
    return this.deferreds.shift().resolve(vars);
  }

  destroy() {
    this.events.removeAllListeners();
    this.cmdParser.destroy();
    return this.socket != null ? this.socket.end() : null;
  }

}
