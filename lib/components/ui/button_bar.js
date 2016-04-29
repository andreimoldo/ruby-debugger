'use babel';

import React from 'react-lite'

export default class ButtonBar extends React.Component {

  constructor(props) {
    super(props);
  }

  // Event Handlers
  handleClickConnection(e) {
    console.log('Click Connection');
  }

  handleClickResume(e) {
    console.log('Click Resume');
  }

  handleClickStepIn(e) {
    console.log('Click Step In');
  }

  handleClickStepOut(e) {
    console.log('Click Step Out');
  }

  handleClickStepOver(e) {
    console.log('Click Step Over');
  }

  // Render
  render() {
    return (
      <div className="inline-block btn-toolbar">
        <div className="btn-group">
          <button className="btn status" onClick={this.handleClickConnection}>Connect</button>
        </div>
        <div className="btn-group">
          <button className="btn resume" onClick={this.handleClickResume}>Resume</button>
          <button className="btn step-in" onClick={this.handleClickStepIn}>Step In</button>
          <button className="btn step-out" onClick={this.handleClickStepOut}>Step Out</button>
          <button className="btn step-over" onClick={this.handleClickStepOver}>Step Over</button>
        </div>
      </div>
    );
  }
}
