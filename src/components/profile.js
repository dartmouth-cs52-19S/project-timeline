/* eslint-disable react/prefer-stateless-function */
// this was displayed in frontend under the /profile URL
// but was ultimatley not implemented as Settings & Saved had most of this fxnality
import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
    this.convertStartTime = this.convertStartTime.bind(this);
  }

  // fxn from settings to convert unix obj startTime to a nice readable thing
  convertStartTime = (oldTime) => {
    if (oldTime !== null) {
      const newTime = String(
        `${oldTime.split('-')[0]}-${oldTime.split('-')[1]}-${oldTime.split('-')[2].split('T')[0]}`,
      );
      return newTime;
    } else {
      return ' sorry this is broken';
    }
  }

  render() {
    const { user } = this.state;
    let { timelines, startTime } = user;
    if (timelines === []) {
      timelines = 'No Timelines Currently Stores';
    }
    if (startTime == null) {
      startTime = 'Something is broken, you should have a start time here';
    }
    return (
      <div>
        <div className="mainHeader">
          <div>
            Welcome, {user.username}
          </div>
          <div>
            <h4>
          Your Current Stage in Life is {this.props.user.startTime}
            </h4>
          </div>
        </div>
        {/* {timelines} */}
      </div>
    );
  }
}


export default Profile;
