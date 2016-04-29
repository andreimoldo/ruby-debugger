'use babel';

import React from 'react-lite'

export default class Breakpoint extends React.Component {

  constructor(props) {
    super(props);
  }

  handleDelete = (e) => {
    this.props.debugger.removeBreakpoint(this.props.breakpoint.id);
  }

  render() {
    return (
      <li className="list-item padded breakpoint-item">
        <input type="checkbox" className="breakpoint-check" checked={this.props.breakpoint.enabled}/>
        <span className="breakpoint-text">{this.props.breakpoint.location}</span>
        <span className="icon icon-trashcan" onClick={this.handleDelete}></span>
      </li>
    )
  }
}
