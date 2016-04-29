'use babel';

import React from 'react-lite'

export default class ButtonBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="inline-block btn-toolbar">
        <div className="btn-group">
          <button className="btn status">Connect</button>
        </div>
        <div className="btn-group">
          <button className="btn resume">Resume</button>
          <button className="btn step-in">Step In</button>
          <button className="btn step-out">Step Out</button>
          <button className="btn step-over">Step Over</button>
        </div>
      </div>
    );
  }
}
