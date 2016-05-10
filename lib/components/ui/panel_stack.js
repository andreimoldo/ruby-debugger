'use babel';

import React from 'react-lite'

import Frame from './frame'

export default class PanelStack extends React.Component {

  constructor(props) {
    super(props);
    // Events
    this.props.debugger.client.events.on('framesChanged', () => this.forceUpdate());
  }

  render() {
    return (
      <atom-panel class="top padded container-stack">
        <div className="inset-panel container-stack-inset">
          <div className="panel-heading">Call Stack</div>
          <div className="panel-body container-stack-list">
            <ul className="list-group">
              {this.props.debugger.frames.map((frame) => {
                return <Frame frame={frame} debugger={this.props.debugger}/>
              })}
            </ul>
          </div>
        </div>
      </atom-panel>
    )
  }
}
