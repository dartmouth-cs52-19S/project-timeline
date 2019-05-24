import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUserInfo, createBanner, updateUser } from '../actions';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newEmail: '',
      newUsername: '',
      newPassword1: '',
      newPassword2: '',
      newStartTime: '',
    };
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.edit = this.edit.bind(this);
    this.convertStartTime = this.convertStartTime.bind(this);
    this.createStartTime = this.createStartTime.bind(this);
    this.checkStartTime = this.checkStartTime.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchUserInfo();
  }

  onCancel(event) {
    this.props.history.push('/explore/start');
  }

  // taken from sign up, just checks if they entered in the right start time
  checkStartTime = () => {
    const startSlash = this.state.startTime.split('/');
    const startDash = this.state.startTime.split('-');
    if (startSlash.length === 1 && startDash.length === 1) {
      return false;
    }
    const startTimeFinal = startSlash.length > 1 ? startSlash : startDash;
    const date = startTimeFinal[2];
    const month = startTimeFinal[1];
    const year = startTimeFinal[0];

    if (year.length !== 4) return false;
    if (month.length !== 2) return false;
    if (date.length !== 2) return false;

    return true;
  }

  // makes the HS grad time unix obj really pretty
  convertStartTime = (oldTime) => {
    if (oldTime !== null) {
      const newTime = String(
        `${oldTime.split('-')[0]}-${oldTime.split('-')[1]}-${oldTime.split('-')[2].split('T')[0]}`,
      );
      return newTime;
    } else {
      this.props.createBanner('Sorry this is not working right now!');
      return null;
    }
  }

  // makes the pretty string super ugly again :(( hello unix obj
  createStartTime() {
    this.setState((prevState) => {
      const newStateStart = (new Date((prevState.startTime))).getTime();
      this.newStartTime = newStateStart;
    });
  }

  // update fxn for all fields wahoo
  edit(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }


  handleSubmit(event) {
    event.preventDefault();
    // if anything is left blank by the user, just keep the same old info
    if (this.state.newUsername === '') {
      this.state.newUsername = this.props.user.username;
    } if (this.state.newEmail === '') {
      this.state.newEmail = this.props.user.email;
    // } if (this.state.newStartTime === '') {
    //   this.state.newStartTime = this.props.user.startTime;
    // } else if ( // start time isn't valid
    //   (Number.isNaN(Date.parse(this.state.newStartTime))) || !this.checkStartTime()) {
    //   this.props.createBanner('Please enter a valid date.');
    } if (this.state.newPassword1 === '' && this.state.newPassword2 === '') {
      this.state.newPassword1 = this.props.user.password;
      this.state.newPassword2 = this.props.user.password;
    } else if (this.state.newPassword1 !== this.state.newPassword2) {
      this.props.createBanner('Your passwords do not match!');
    } else { // FINALLY save the user obj and update it. If a field is not filled out,
      // we send the user object what it has currently.
      this.props.createBanner('You have saved your settings. Thanks!');
      this.props.updateUser(
        {
          email: this.state.newEmail,
          username: this.state.newUsername,
          password: this.state.newPassword1,
          // startTime: this.state.newStartTime,
        },
      );
    }
  }
  // want to call fxn if user exists (which returns a t/f) onChange for username so realtime

  render() {
    if (this.props.user == null) {
      return (
        <div className="flex" style={{ alignItems: 'flex-end', justifyContent: 'space-around' }}>
          <h1>Loading</h1>
        </div>
      );
    } else {
      return (
        <div>
          <div className="settingsHeader">
            Settings
            WATING FOR BACKEND
          </div>
          <div>
            current username: {this.props.user.username}
          </div>
          <div className="username">
            <input
              name="newUsername"
              placeholder="new username"
              onChange={this.edit}
              value={this.state.newUsername}
            />
          </div>
          <div>
            current email: {this.props.user.email}
          </div>
          <div className="email">
            <input
              name="newEmail"
              placeholder="new email"
              onChange={this.edit}
              value={this.state.newEmail}
            />
          </div>
          <div>
           change your password
          </div>
          <div className="password">
            <input
              name="newPassword1"
              type="password"
              placeholder="new password"
              onChange={this.edit}
              value={this.state.newPassword1}
            />
            <input
              name="newPassword2"
              type="password"
              placeholder="re-enter your new password"
              onChange={this.edit}
              value={this.state.newPassword2}
            />
          </div>

          <div>
            current HS graduation date: {this.convertStartTime(this.props.user.startTime)}
          </div>
          <div className="startTime">
            <input
              name="newStartTime"
              placeholder="new hs graduation date YYYY-MM-DD"
              onChange={this.edit}
              value={this.state.newStartTime}
            />
          </div>
          <button type="button" onClick={this.onCancel}>Cancel</button>
          <button type="button" onClick={this.handleSubmit}>Save Changes</button>
        </div>
      );
    }
  }
}
const mapStateToProps = reduxState => (
  {
    user: reduxState.user,
  }
);
// export default withRouter(connect(mapStateToProps, null)(Settings));
export default withRouter(connect(mapStateToProps,
  { fetchUserInfo, createBanner, updateUser })(Settings));
