import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import Profile from '../components/profile';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {

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

export default withRouter(connect(null, null)(UserProfile));
