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

  edit(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // error checks
    if (this.state.email === '') {
      this.props.createBanner('Please enter an email.');
    } else if (this.state.username === '') {
      this.props.createBanner('Please enter a username.');
    } else if (this.state.password === '') {
      this.props.createBanner('Please enter a password.');
    } else if (this.state.startTime === null || Number.isNaN(Date.parse(this.state.startTime))) {
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
                <h4>Sign up and discover all the possibilities in life!</h4>
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
                  Get Started
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
