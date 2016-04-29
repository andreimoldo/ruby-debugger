'use babel';

import React from 'react-lite'

export default class PanelStack extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <atom-panel class="top padded container-stack">
        <div className="inset-panel">
          <div className="panel-heading">Call Stack</div>
          <div className="panel-body"></div>
        </div>
      </atom-panel>
    )
  }
}
