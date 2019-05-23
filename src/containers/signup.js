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
    this.props.signupUser(this.state, this.props.history);
  }

  render() {
    return (
      <div className="flexWide">
        <div className="userGraphic" />
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
                  onChange={this.edit}
                  value={this.state.password}
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

export default withRouter(connect(null, { signupUser })(SignUp));
