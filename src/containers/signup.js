import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Particles from 'react-particles-js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { signupUser, createBanner, checkUsername } from '../actions';

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

// date dropdown stuff
const optionsYear = [
  '2010', '2011', '2012',
];
const optionsMonth = [
  'Jan', 'Feb', 'March',
];

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      startTime: '',
      year: '',
      month: '',
    };

    this.edit = this.edit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createStartTime = this.createStartTime.bind(this);
    this.monthChange = this.monthChange.bind(this);
    this.yearChange = this.yearChange.bind(this);
  }

  onCancel(event) {
    this.props.history.push('/');
  }

  // checks if email is a valid email
  // adapted from https://tylermcginnis.com/validate-email-address-javascript/
  checkEmail = (email) => {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // eslint-disable-next-line class-methods-use-this
  monthChange(e) {
    this.setState({ month: e.value });
  }

  // eslint-disable-next-line class-methods-use-this
  yearChange(e) {
    this.setState({ year: e.value });
  }


  edit(e) {
    // username not taken check
    if (e.target.name === this.state.username) {
      this.props.checkUsername();
      // realtime
      if (this.props.chkUsername) { this.props.createBanner('Sorry, this username is taken'); }
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // error checks
    console.log(this.checkEmail(this.state.email));
    if (this.state.email === '' || this.checkEmail(this.state.email)) {
      this.props.createBanner('Please enter a valid email.');
    } else if (this.state.username === '') {
      this.props.createBanner('Please enter a valid username.');
    } else if (this.state.password === '') {
      this.props.createBanner('Please enter a password.');
    } else if (
      (this.state.year === '' || this.state.month === '')) {
      console.log(this.state.year);
      console.log(this.state.month);
      this.props.createBanner('Please enter a valid date.');
    } else {
    // console.log(`sign up info:
    // ${this.state.username} ${this.state.email} ${this.state.password}`);
      this.createStartTime();
      this.props.signupUser(this.state, this.props.history);
    }
  }

  createStartTime() { // changes the expected HS grad date to a unix string
    let numMonth = 0;
    switch (this.state.month) {
      case 'Jan':
        break;
      case 'Feb':
        numMonth = 1;
        break;
      case 'March':
        numMonth = 1;
        break;
      default:
        numMonth = 0;
        break;
    }
    const numYear = parseInt(this.state.year, 10);
    const date = new Date(numYear, numMonth, 1);
    console.log(date);
    const startTimeMili = date.getTime(); // in milliseconds
    this.setState({ startTime: startTimeMili }, () => console.log(this.state.startTime));
  }

  // want to call fxn if user exists (which returns a t/f) onChange for username so realtime

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
                <h6>Sign up and discover all the possibilities in life!</h6>
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
                  type="email"
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
              <div> Please select an expected graduation year</div>
              <div className="flexWide">
                <i className="fas fa-graduation-cap signicon" />
                <div>
                  <Dropdown
                    options={optionsYear}
                    onChange={this.yearChange}
                    value={this.state.year}
                    placeholder="Select a year"
                  />
                  <Dropdown
                    options={optionsMonth}
                    onChange={this.monthChange}
                    value={this.state.month}
                    placeholder="Select a month"
                  />

                </div>

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
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    chkUser: state.auth.chkUsername,
  }
);


export default withRouter(connect(mapStateToProps,
  { signupUser, createBanner, checkUsername })(SignUp));
