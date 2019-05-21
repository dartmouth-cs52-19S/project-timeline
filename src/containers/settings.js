import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heyyyyKatie: 'heyyyy katie',
    };
  }

  render() {
    return (
      <div className="signin">
        {this.state.heyyyyKatie}
      </div>
    );
  }
}

export default withRouter(connect(null, null)(Settings));
