'use babel'

import React from 'react-lite'

export default class Scroller extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='scroller'>
        { this.props.children }
      </div>
    )
  }
}
