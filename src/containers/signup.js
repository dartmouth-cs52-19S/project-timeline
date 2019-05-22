import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signupUser } from '../actions';

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
    if (this.state.email === '') console.log('Please enter an email');
    if (this.state.username === '') console.log('Please enter a username');
    if (this.state.password === '') console.log('Please enter a password');
    if (this.state.startTime === null || Number.isNaN(Date.parse(this.state.startTime))) {
      console.log('Please enter a valid date');
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

export default withRouter(connect(null, { signupUser })(SignUp));
