'use babel';

import _ from 'lodash';
import React from 'react-lite'

export default class Breakpoint extends React.Component {

  constructor(props) {
    super(props);
  }

  toggleBreakpoint = (e) => {
    if (this.props.breakpoint.enabled) {
      this.props.debugger.disableBreakpoint(this.props.breakpoint.id);
    } else {
      this.props.debugger.enableBreakpoint(this.props.breakpoint.id);
    }
  }

  navigateToBreakpoint = (e) => {
    var [file, line] = _.split(this.props.breakpoint.location, ':');
    atom.workspace.open(file, {initialLine: line - 1, searchAllPanes: true});
  }

  deleteBreakpoint = (e) => {
    this.props.debugger.removeBreakpoint(this.props.breakpoint.id);
  }

  render() {
    return (
      <li className="list-item padded breakpoint-item">
        <span className="breakpoint-text">{this.props.breakpoint.location}</span>
        <span className="icon icon-file-symlink-file" onClick={this.navigateToBreakpoint}></span>
        <span className="icon icon-trashcan" onClick={this.deleteBreakpoint}></span>
      </li>
    )
  }
}
