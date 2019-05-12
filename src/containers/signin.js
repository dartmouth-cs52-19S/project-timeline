import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signinUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      history: this.props.history,
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.signinUser(this.state, this.props.history);
  }

  render() {
    return (
      <div className="signin">
        <input placeholder="email" onChange={this.onEmailChange} value={this.state.email} />
        <input placeholder="password" onChange={this.onPasswordChange} value={this.state.password} />
        <button type="button" onClick={this.onCancel}>Cancel</button>
        <button type="button" onClick={this.handleSubmit}>Sign In</button>
      </div>
    );
  }
}

export default withRouter(connect(null, { signinUser })(SignIn));
