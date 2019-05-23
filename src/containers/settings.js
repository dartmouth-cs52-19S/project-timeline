import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUserInfo, createBanner } from '../actions';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newEmail: '',
      newUsername: '',
      // newPassword: '',
      // newStartTime: '',
    };
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.edit = this.edit.bind(this);

    console.log(this.props);
    console.log(this.props.user);
  }

  componentDidMount = () => {
    this.props.fetchUserInfo();
  }

  onCancel(event) {
    this.props.history.push('/explore/start');
  }

  // update fxn for username, email
  edit(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // update for password
  // fxn that takes a hashed password => not hashed!

  // update for startTime - WORK IN PROGRESS
  // fxn than takes a unix obj => readable date!
  // niceStartTime() { // changes the expected HS grad date to a string
  //   this.setState((prevState) => {
  //     // have a unix Date object in milliseconds
  //     const startTimeNew = new Date(prevState.startTime).setTime();
  //     const niceNewStartTime = startTimeNew.toDateString();
  //     // const newStateStart = (new Date((prevState.startTime))).getTime();
  //     this.newStartTime = niceNewStartTime;
  //   });
  // }

  // DELETE THE BELOW WHEN YOU MAKE THIS KATIE!!!!!!
  // eslint-disable-next-line class-methods-use-this
  handleSubmit(event) {
    event.preventDefault();
    // right now just throws a banner error bc I'm not done with it
    this.props.createBanner('Sorry this is not working right now!');
    // console.log(`sign up info:
    // ${this.state.username} ${this.state.email} ${this.state.password}`);
    // this.props.SOME ACTION (this.state, this.props.history);

    // /here I want to update the user obj with the new local state username & email above!
  }

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
            WORK IN PROGRESS :-)
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
          {/* <div>
            current password
            <p>{this.props.user.password} THIS IS HASHED THO</p>
          </div>
          <div className="password">
              <input
                name="newPassword"
                placeholder="new password"
                onChange={this.edit}
                value={this.state.newPassword}
              />
            </div>
            <div>
            current HS graduation date
            <p>{this.props.user.startTime} THIS IS A UNIX OBJ THO</p>
          </div>
            <div className="startTime">
              <input
                name="newStartTime"
                placeholder="new hs graduation date YYYY-MM-DD"
                onChange={this.edit}
                value={this.state.newStartTime}
              />
            </div> */}
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
export default withRouter(connect(mapStateToProps, { fetchUserInfo, createBanner })(Settings));
