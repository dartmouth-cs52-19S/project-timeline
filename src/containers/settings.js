import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(this.props);
  }

  onCancel(event) {
    this.props.history.push('/');
  }

  // update fxn for username, email
  edit(e) {
    this.setState({ [e.target.name]: e.target.value });
    // this should be the LOCAL state I have created above
  }

  // update for password


  // DELETE THE BELOW WHEN YOU MAKE THIS KATIE!!!!!!
  // eslint-disable-next-line class-methods-use-this
  handleSubmit(event) {
    event.preventDefault();
    // console.log(`sign up info:
    // ${this.state.username} ${this.state.email} ${this.state.password}`);
    // this.props.SOME ACTION (this.state, this.props.history);

    // /here I want to update the user obj with the new local state username, email above!
  }

  // if you refresh it doesn't work
  render() {
    return (
      <div>
        <div className="settingsHeader">
        Settings
        </div>
        <div>
        current username
          <p>{this.props.updatedUser.username}</p>
        </div>
        <div className="username">
          <input
            name="username"
            placeholder="new username"
           // onChange={this.FXN}
          />
        </div>
        <div>
        current email
          <p>{this.props.updatedUser.email}</p>
        </div>
        <div className="email">
          <input
            name="email"
            placeholder="new email"
          />
        </div>
        {/* <div className="password">
          <input
            name="password"
            placeholder="new password"
          />
        </div>
        <div className="startTime">
          <input
            name="startTime"
            placeholder="new hs graduation date YYYY-MM-DD"
          />
        </div> */}
        <button type="button" onClick={this.onCancel}>Cancel</button>
        <button type="button" onClick={this.handleSubmit}>Save Changes</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return (
    {
      user: state.user,
      updatedUser: state.auth.user,
    }
  );
}

export default withRouter(connect(mapStateToProps, null)(Settings));
