/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <button type="submit">{user.username}</button>
        <button type="submit">{user.startTime}</button>
        <button type="submit">{user.timelines}</button>
      </div>
    );
  }
}


export default Profile;
