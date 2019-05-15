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
    };

    this.edit = this.edit.bind(this);
    // this.onEmailChange = this.onEmailChange.bind(this);
    // this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // onEmailChange(event) {
  //   this.setState({ email: event.target.value });
  // }

  // onPasswordChange(event) {
  //   this.setState({ password: event.target.value });
  // }

  onCancel(event) {
    this.props.history.push('/');
  }

  edit(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signinUser(this.state, this.props.history);
  }

  render() {
    return (
      <div className="signin">
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
        <button type="button" onClick={this.onCancel}>Cancel</button>
        <button type="button" onClick={this.handleSubmit}>Sign In</button>
      </div>
    );
  }
}

export default withRouter(connect(null, { signinUser })(SignIn));
