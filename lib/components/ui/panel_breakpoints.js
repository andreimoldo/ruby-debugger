'use babel';

import React from 'react-lite'

import Breakpoint from './breakpoint'

export default class PanelBreakpoints extends React.Component {

  constructor(props) {
    super(props);
    // Events
    this.props.debugger.client.events.on('breakpointChanged', () => this.forceUpdate());
  }

  render() {
    return (
      <atom-panel class="top padded container-breakpoints">
        <div className="inset-panel">
          <div className="panel-heading">Breakpoints</div>
          <div className="panel-body">
            <ul className="list-group">
              {this.props.debugger.breakpoints.map((breakpoint) => {
                return <Breakpoint breakpoint={breakpoint} debugger={this.props.debugger}/>
              })}
            </ul>
          </div>
        </div>
      </atom-panel>
    );
  }
}
