'use babel';

import React from 'react-lite'

export default class Variable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="list-item padded variable-item">
        <span className="variable-name">{this.props.variable.name}</span>
        <span> = </span>
        <span className="variable-type">{ `{${this.props.variable.type}}` }</span>
        <span className="variable-object-id"> &lt;{this.props.variable.objectId}&gt;</span>
      </li>
    )
  }
}
