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
    };
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onCancel(event) {
    this.props.history.push('/');
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`sign up info:  ${this.state.username}`);
    this.props.signupUser(this.state, this.props.history);
  }

  render() {
    return (
      <div className="signin">
        <input placeholder="username" onChange={this.onUsernameChange} value={this.state.username} />
        <input placeholder="email" onChange={this.onEmailChange} value={this.state.email} />
        <input placeholder="password" onChange={this.onPasswordChange} value={this.state.password} />
        <button type="button" onClick={this.onCancel}>Cancel</button>
        <button type="button" onClick={this.handleSubmit}>Make an Account</button>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));
