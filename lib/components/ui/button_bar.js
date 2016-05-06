'use babel';

import React from 'react-lite'

export default class ButtonBar extends React.Component {

  constructor(props) {
    super(props);
  }

  // Styles
  getButtonClasses(buttonName) {
    var extraClasses = '';
    if (this.props.debugger.state.current !== 'paused') {
      extraClasses = 'disabled';
    }

    return `btn ${buttonName} ${extraClasses}`
  }

  // Event Handlers
  handleClickConnection = (e) => {
    if (this.props.debugger.state.current === 'disconnected') {
      this.props.debugger.connect();
    } else {
      this.props.debugger.disconnect();
    }
  }

  handleClickResume = (e) => {
    this.props.debugger.play();
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
          <button className="btn status" onClick={ this.handleClickConnection }>
            { this.props.debugger.state.current === 'disconnected' ? 'Connect' : 'Disconnect' }
          </button>
        </div>
        <div className="btn-group">
          <button className={this.getButtonClasses('resume')} onClick={ this.handleClickResume }>Resume</button>
          <button className={this.getButtonClasses('step-in')} onClick={ this.handleClickStepIn }>Step In</button>
          <button className={this.getButtonClasses('step-out')} onClick={ this.handleClickStepOut }>Step Out</button>
          <button className={this.getButtonClasses('step-over')} onClick={ this.handleClickStepOver }>Step Over</button>
        </div>
        </div>
    );
  }
}
