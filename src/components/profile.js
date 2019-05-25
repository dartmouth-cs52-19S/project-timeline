/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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
      this.props.createBanner('Sorry this is not working right now!');
      return ' sorry this is broken';
    }
  }

  // {this.convertStartTime(user.startTime)}

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
          Your Current Stage in Life is {this.convertStartTime(this.props.user.startTime)}
            </h4>
          </div>
        </div>
        {/* {timelines} */}
      </div>
    );
  }
}


export default Profile;
