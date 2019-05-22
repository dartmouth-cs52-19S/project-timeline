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
        <div className="mainHeader">
          <div>
            Welcome, {user.username}
          </div>
          <div>
            <h4>
          Your Current Stage in Life is {startTime}
            </h4>
          </div>
        </div>
        {/* {timelines} */}
      </div>
    );
  }
}


export default Profile;
