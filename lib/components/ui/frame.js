'use babel'

import React from 'react-lite'

import path from 'path'

export default class Variable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="list-item frame-item">
        <span className="frame-name">{path.parse(this.props.frame.file).base}</span>
      </li>
    )
  }
}
