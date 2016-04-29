'use babel';

import _ from 'lodash';
import React from 'react-lite'

export default class Breakpoint extends React.Component {

  constructor(props) {
    super(props);
  }

  handleDelete = (e) => {
    this.props.debugger.removeBreakpoint(this.props.breakpoint.id);
  }

  handleNavigate = (e) => {
    var [file, line] = _.split(this.props.breakpoint.location, ':');
    atom.workspace.open(file, {initialLine: line - 1, searchAllPanes: true});
  }

  render() {
    return (
      <li className="list-item padded breakpoint-item">
        <input type="checkbox" className="breakpoint-check" checked={this.props.breakpoint.enabled}/>
        <span className="breakpoint-text">{this.props.breakpoint.location}</span>
        <span className="icon icon-file-symlink-file" onClick={this.handleNavigate}></span>
        <span className="icon icon-trashcan" onClick={this.handleDelete}></span>
      </li>
    )
  }
}
