import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Particles from 'react-particles-js';
import { signupUser, createBanner } from '../actions';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      startTime: '',
    };

    this.edit = this.edit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createStartTime = this.createStartTime.bind(this);
  }

  onCancel(event) {
    this.props.history.push('/');
  }


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

  // checks if email is a valid email
  // adapted from https://tylermcginnis.com/validate-email-address-javascript/
  checkEmail = (email) => {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


  edit(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // error checks
    console.log(this.checkStartTime());
    console.log(this.checkEmail(this.state.email));
    if (this.state.email === '' || this.checkEmail(this.state.email)) {
      this.props.createBanner('Please enter a valid email.');
    } else if (this.state.username === '') {
      this.props.createBanner('Please enter a username.');
    } else if (this.state.password === '') {
      this.props.createBanner('Please enter a password.');
    } else if (
      (this.state.startTime === null
      || Number.isNaN(Date.parse(this.state.startTime)))
      || !this.checkStartTime()
    ) {
      this.props.createBanner('Please enter a valid date.');
    } else {
    // console.log(`sign up info:
    // ${this.state.username} ${this.state.email} ${this.state.password}`);
      this.createStartTime();
      this.props.signupUser(this.state, this.props.history);
    }
  }

  createStartTime() { // changes the expected HS grad date to a unix string
    this.setState((prevState) => {
      const newStateStart = (new Date((prevState.startTime))).getTime();
      this.startTime = newStateStart;
    });
  }

  // want to call fxn if user exists (which returns a t/f) onChange for username so realtime

  render() {
    return (
      <div className="flexWide">
        <div className="userGraphic">
          <Particles className="particles" params={particlesOptions} />
        </div>
        <div className="signContainer">
          <div className="whiteBox">
            <div className="signin">
              <div className="signText">
                <h3>Sign Up</h3>
                <h6>Sign up and discover all the possibilities in life!</h6>
              </div>
              <div className="flexWide">
                <i className="far fa-user signicon" />
                <input
                  name="username"
                  className="signinput"
                  placeholder="username"
                  onChange={this.edit}
                  value={this.state.username}
                />
              </div>
              <div className="flexWide">
                <i className="far fa-paper-plane signicon" />
                <input
                  name="email"
                  className="signinput"
                  placeholder="email"
                  type="email"
                  onChange={this.edit}
                  value={this.state.email}
                />
              </div>
              <div className="flexWide">
                <i className="fas fa-lock signicon" />
                <input
                  name="password"
                  className="signinput"
                  placeholder="password"
                  type="password"
                  onChange={this.edit}
                  value={this.state.password}
                />
              </div>
              <div className="flexWide">
                <i className="fas fa-graduation-cap signicon" />
                <input
                  name="startTime"
                  className="signinput"
                  placeholder="expected high school graduation YYYY-MM-DD"
                  onChange={this.edit}
                  value={this.state.startTime}
                />
              </div>
              <div className="signSubmitBox">
                <button
                  type="button"
                  className="buttonSecondary"
                  onClick={this.onCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="buttonCTA"
                  onClick={this.handleSubmit}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser, createBanner })(SignUp));
