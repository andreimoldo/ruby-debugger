'use babel';

import React from 'react-lite'

export default class PanelVars extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <atom-panel class="top padded container-vars">
        <div className="inset-panel">
          <div className="panel-heading">Variables</div>
          <div className="panel-body"></div>
        </div>
      </atom-panel>
    );
  }
}
