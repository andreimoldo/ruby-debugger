'use babel';

import React from 'react-lite'

export default class PanelBreakpoints extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <atom-panel className="top padded container-breakpoints">
        <div className="inset-panel">
          <div className="panel-heading">Breakpoints</div>
          <div className="panel-body"> </div>
        </div>
      </atom-panel>
    );
  }
}
