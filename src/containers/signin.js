import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Particles from 'react-particles-js';
import { signinUser, createBanner, clearBanner } from '../actions';


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

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      hidden: true,
    };

    this.edit = this.edit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.eyeToggle = this.eyeToggle.bind(this);
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

  // all password stuff based off of this https://edvins.io/show-and-hide-password-in-react/
  toggleShow(e) {
    if (this.state.password === '') {
      this.props.createBanner('Please enter a password to see it');
      setTimeout(() => {
        this.props.clearBanner();
      }, 3000);
      // eslint-disable-next-line react/no-access-state-in-setstate
    } else this.setState({ hidden: !this.state.hidden });
  }

  eyeToggle() {
    let string = '';
    if (this.hidden) {
      string = 'far fa-eye';
    } else {
      string = 'far fa-eye-slash';
    }
    return string;
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
                <h3>Sign In</h3>
                <h6>Sign Back in to Access Your Profile and Account</h6>
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
                  type={this.state.hidden ? 'password' : 'text'}
                  value={this.state.password}
                  onChange={this.edit}
                  className="signinput"
                  placeholder="password"
                />
                <i className="far fa-eye signicon"
                  id="passButton"
                  role="button"
                  tabIndex={0}
                  onClick={this.toggleShow}
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
    );
  }
}

export default withRouter(connect(null, { signinUser, createBanner, clearBanner })(SignIn));
