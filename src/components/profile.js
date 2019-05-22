/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      user: this.props.user,
    };
  }

  render() {
    const { user } = this.state;
    let { timelines, startTime } = user;
    if (timelines === []) {
      timelines = 'No TimeLines Currently Stores';
    }
    if (startTime == null) {
      startTime = 'LET\'S GET IT STARTED AYAT';
    }
    return (
      <div>
        <button type="submit">{user.username}</button>
        <button type="submit">{startTime}</button>
        <button type="submit">{timelines}</button>
      </div>
    );
  }
}


export default Profile;
