'use babel';

import React from 'react-lite'

export default class PanelVars extends React.Component {

  constructor(props) {
    super(props);
    // Events
    this.props.debugger.client.events.on('variablesChanged', () => this.forceUpdate());
  }

  render() {
    return (
      <atom-panel class="top padded container-vars">
        <div className="inset-panel">
          <div className="panel-heading">Variables</div>
          <div className="panel-body">
          <ul className="list-group">
            {this.props.debugger.variables.map((variable) => {
              // return <Variable variable={variable} debugger={this.props.debugger}/>
              <li>variable</li>
            })}
          </ul></div>
        </div>
      </atom-panel>
    );
  }
}
