import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signupUser, createBanner } from '../actions';
// import { Banner } from '../components/banner';

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
      <div className="signin">
        <input
          name="username"
          placeholder="username"
          onChange={this.edit}
          value={this.state.username}
        />
        <input
          name="email"
          placeholder="email"
          onChange={this.edit}
          value={this.state.email}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={this.edit}
          value={this.state.password}
        />
        <input
          name="startTime"
          placeholder="expected high school graduation YYYY-MM-DD"
          onChange={this.edit}
          value={this.state.startTime}
        />
        <button type="button" onClick={this.onCancel}>Cancel</button>
        <button type="button" onClick={this.handleSubmit}>Join</button>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser, createBanner })(SignUp));
