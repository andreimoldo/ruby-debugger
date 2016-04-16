'use babel';

import _ from 'underscore-plus';
import EventEmitter from 'events'
import net from 'net'
import q from 'q'

module.exports = Client = (function() {
  function Client() {
    this.host = '127.0.0.1';
    this.port = atom.config.get('debugger-ruby.port') || 1234;
    this.socket = null;
    this.events = new EventEmitter();
    this.deferreds = [];
    // this.cmdParser = new XmlParser();
    // this.cmdParser.onCommand((function(_this) {
    //   return function(command) {
    //     return _this.handleCmd(command);
    //   };
    // })(this));
  }

  Client.prototype.onDisconnected = function(cb) {
    return this.events.on('disconnected', cb);
  };

  Client.prototype.onPaused = function(cb) {
    return this.events.on('paused', cb);
  };

  Client.prototype.connect = function() {
    var deferred;
    deferred = q.defer();
    this.socket = net.connect(this.port, this.host);
    this.socket.on('connect', (function(_this) {
      return function() {
        return deferred.resolve();
      };
    })(this));
    this.socket.on('error', (function(_this) {
      return function(e) {
        return deferred.reject(e);
      };
    })(this));
    this.socket.on('data', (function(_this) {
      return function(data) {
        console.log('Received: ' + data);
        // return _this.cmdParser.write(data.toString());
      };
    })(this));
    this.socket.on('close', (function(_this) {
      return function() {
        _this.socket = null;
        return _this.events.emit('disconnected');
      };
    })(this));
    return deferred.promise;
  };

  Client.prototype.disconnect = function() {
    return this.runCmd('exit');
  };

  Client.prototype.start = function() {
    return this.runCmd('start');
  };

  Client.prototype.stepIn = function() {
    return this.runCmd('step');
  };

  Client.prototype.stepOut = function() {
    return this.runCmd('finish');
  };

  Client.prototype.stepOver = function() {
    return this.runCmd('next');
  };

  Client.prototype["continue"] = function() {
    return this.runCmd('cont');
  };

  Client.prototype.pause = function() {
    return this.runCmd('pause');
  };

  Client.prototype.backtrace = function() {
    return this.runCmdWithResponse('backtrace');
  };

  Client.prototype.addBreakpoint = function(scriptPath, lineNumber) {
    return this.runCmdWithResponse('break', scriptPath + ":" + lineNumber);
  };

  Client.prototype.localVariables = function() {
    return this.runCmdWithResponse('var local');
  };

  Client.prototype.globalVariables = function() {
    return this.runCmdWithResponse('var global');
  };

  Client.prototype.runCmd = function(cmd, arg) {
    if (arg) {
      return this.socket.write(cmd + " " + arg + "\n");
    } else {
      return this.socket.write(cmd + "\n");
    }
  };

  Client.prototype.runCmdWithResponse = function() {
    var deferred;
    this.deferreds.push(deferred = q.defer());
    this.runCmd.apply(this, arguments);
    return deferred.promise;
  };

  Client.prototype.handleCmd = function(command) {
    var data, method, name;
    console.log(CSON.stringify(command));
    name = Object.keys(command)[0];
    data = command[name];
    method = "handle" + _.capitalize(name) + "Cmd";
    return typeof this[method] === "function" ? this[method](data) : void 0;
  };

  Client.prototype.handleBreakpointAddedCmd = function(data) {
    var location, num;
    num = data.attrs.no;
    location = data.attrs.location;
    this.deferreds.shift().resolve(data);
    return this.events.emit('breakpointAdded', num, location);
  };

  Client.prototype.handleBreakpointCmd = function(data) {
    return this.handleSuspendedCmd(data);
  };

  Client.prototype.handleSuspendedCmd = function(data) {
    var breakpoint, file, line;
    file = data.attrs.file;
    line = parseInt(data.attrs.line);
    breakpoint = {
      file: file,
      line: line
    };
    return this.events.emit('paused', breakpoint);
  };

  Client.prototype.handleFramesCmd = function(data) {
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
  };

  Client.prototype.handleVariablesCmd = function(data) {
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
  };

  Client.prototype.destroy = function() {
    var ref;
    this.events.removeAllListeners();
    // this.cmdParser.destroy();
    return (ref = this.socket) != null ? ref.end() : void 0;
  };

  return Client;

})();

// ---
// generated by coffee-script 1.9.2
