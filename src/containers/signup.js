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

    this.edit = this.edit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCancel(event) {
    this.props.history.push('/');
  }

  edit(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(`sign up info:
    // ${this.state.username} ${this.state.email} ${this.state.password}`);
    this.props.signupUser(this.state, this.props.history);
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
          placeholder="password"
          onChange={this.edit}
          value={this.state.password}
        />
        <button type="button" onClick={this.onCancel}>Cancel</button>
        <button type="button" onClick={this.handleSubmit}>Join</button>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));
