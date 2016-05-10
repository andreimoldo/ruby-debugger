'use babel';

import React from 'react-lite'

import ButtonBar from './ui/button_bar'
import PanelBreakpoints from './ui/panel_breakpoints'
import PanelStack from './ui/panel_stack'
import PanelVars from './ui/panel_vars'

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.props.debugger.state.onafterevent = () => this.forceUpdate();
  }

  render() {
    return (
      <div className="container-main">
        <div className="container-header">
          <div className="inline-block">
            <span className="icon icon-rocket"></span>
            <span className="header-title">Ruby Debugger</span>
          </div>
          <ButtonBar debugger={this.props.debugger} />
        </div>
        <div className="container-data">
          <PanelStack debugger={this.props.debugger} />
          <PanelVars debugger={this.props.debugger} />
          <PanelBreakpoints debugger={this.props.debugger} />
        </div>
      </div>
    );
  }
}
