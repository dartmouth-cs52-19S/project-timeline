import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      regina: 'heyyyy regina',
    };
  }

  render() {
    console.log('in landing page');
    return (
      <div className="landing">
        {this.state.regina}
      </div>
    );
  }
}

export default withRouter(connect(null, null)(Landing));
