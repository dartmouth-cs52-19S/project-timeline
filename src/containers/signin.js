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
    this.props.signinUser(this.state, this.props.history);
  }

  render() {
    return (
      <div className="flexWide">
        <div className="userGraphic" />
        <div className="signContainer">
          <div className="whiteBox">
            <div className="signin">
              <div className="signText">
                <h3>Sign In</h3>
                <h4>Sign Back in to Access Your Profile and Account</h4>
              </div>
              <div className="flexWide">
                <i className="far fa-paper-plane signicon" />
                <input
                  name="email"
                  placeholder="email"
                  className="signinput"
                  onChange={this.edit}
                  value={this.state.email}
                />
              </div>
              <div className="flexWide">
                <i className="fas fa-lock signicon" />
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="signinput"
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
                  Sign In
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      // <div className="signin">
      //   <input
      //     name="email"
      //     placeholder="email"
      //     onChange={this.edit}
      //     value={this.state.email}
      //   />
      //   <input
      //     name="password"
      //     type="password"
      //     placeholder="password"
      //     onChange={this.edit}
      //     value={this.state.password}
      //   />
      //   <div className="signSubmitBox">
      //     <button type="button" onClick={this.onCancel} className="buttonSecondary">Cancel</button>
      //     <button type="button" onClick={this.handleSubmit} className="buttonCTA">Sign In</button>
      //   </div>
      // </div>
    );
  }
}

export default withRouter(connect(null, { signinUser })(SignIn));
