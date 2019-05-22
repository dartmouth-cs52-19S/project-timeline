/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUserInfo } from '../actions';
import Profile from '../components/profile';

class UserProfile extends Component {
  render() {
    if (this.props.user !== null) {
      return (
        <div>
            Loading
        </div>
      );
    } else {
      return (
        <Profile user={this.props.user} />
      );
    }
  }
}

const mapStateToProps = reduxState => (
  {
    user: reduxState.user,
  }
);


export default withRouter(connect(mapStateToProps, { fetchUserInfo })(UserProfile));
