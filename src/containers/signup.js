import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Particles from 'react-particles-js';
import Dropdown from 'react-dropdown';
import {
  signupUser, createBanner, checkUsername, clearBanner,
} from '../actions';


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
  '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014',
  '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025',
  '2026', '2027', '2028', '2029', '2030',
];
const optionsMonth = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
];

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      startTime: new Date(), // should this be a date obj lol
      year: '',
      month: '',
      hidden: true,
    };

    this.edit = this.edit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createStartTime = this.createStartTime.bind(this);
    this.monthChange = this.monthChange.bind(this);
    this.yearChange = this.yearChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  onCancel(event) {
    this.props.history.push('/');
  }

  // checks if email is a valid email
  // adapted from https://tylermcginnis.com/validate-email-address-javascript/
  checkEmail = (email) => {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  toggleShow(e) {
    if (this.state.password === '') {
      this.props.createBanner('Please enter a password to see it.');
      setTimeout(() => {
        this.props.clearBanner();
      }, 3000);
      // eslint-disable-next-line react/no-access-state-in-setstate
    } else this.setState({ hidden: !this.state.hidden });
  }

  monthChange(e) {
    this.setState({ month: e.value });
  }

  yearChange(e) {
    this.setState({ year: e.value });
  }

  edit(e) {
    this.setState({ [e.target.name]: e.target.value });
    // username not taken check
    this.props.checkUsername(e.target.value);

    // in realtime
    if (this.props.chkUser) {
      this.props.createBanner('Sorry, this username is taken');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // error checks
    if (this.state.email === '' || this.checkEmail(this.state.email)) {
      this.props.createBanner('Please enter a valid email.');
      setTimeout(() => {
        this.props.clearBanner();
      }, 2000);
    } else if (this.state.username === '') {
      this.props.createBanner('Please enter a valid username.');
      setTimeout(() => {
        this.props.clearBanner();
      }, 2000);
    } else if (this.state.password === '') {
      this.props.createBanner('Please enter a password.');
      setTimeout(() => {
        this.props.clearBanner();
      }, 2000);
    } else if (
      (this.state.year === '' || this.state.month === '')) {
      this.props.createBanner('Please enter a valid date.');
      setTimeout(() => {
        this.props.clearBanner();
      }, 2000);
    } else {
      this.createStartTime();
    }
  }

  createStartTime() { // changes the expected HS grad date to a date obj
    let numMonth = 0;
    switch (this.state.month) {
      case 'Jan':
        break;
      case 'Feb':
        numMonth = 1;
        break;
      case 'Mar':
        numMonth = 2;
        break;
      case 'Apr':
        numMonth = 3;
        break;
      case 'May':
        numMonth = 4;
        break;
      case 'June':
        numMonth = 5;
        break;
      case 'July':
        numMonth = 6;
        break;
      case 'Aug':
        numMonth = 7;
        break;
      case 'Sept':
        numMonth = 8;
        break;
      case 'Oct':
        numMonth = 9;
        break;
      case 'Nov':
        numMonth = 10;
        break;
      case 'Dec':
        numMonth = 11;
        break;
      default:
        numMonth = 0;
        break;
    }
    const numYear = parseInt(this.state.year, 10);
    const date = new Date(numYear, numMonth, 1);
    // const startTimeMili = date.getTime(); // in milliseconds
    this.setState({ startTime: date }, () => {
      this.props.signupUser(this.state, this.props.history);
    });
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
                  type={this.state.hidden ? 'password' : 'text'}
                  value={this.state.password}
                  onChange={this.edit}
                  placeholder="password"
                  className="signinput"
                />
                <i className="far fa-eye signicon"
                  id="passButton"
                  role="button"
                  tabIndex={0}
                  onClick={this.toggleShow}
                />
              </div>
              <div className="signUpText">
                <h6> Please select your expected HS graduation date:</h6>
              </div>
              <div className="flexWide">
                <i className="fas fa-graduation-cap signicon" />
                <Dropdown
                  className="dropdown"
                  options={optionsYear}
                  onChange={this.yearChange}
                  value={this.state.year}
                  placeholder="Select a year"
                  key="year"
                />
                <Dropdown
                  className="dropdown"
                  options={optionsMonth}
                  onChange={this.monthChange}
                  value={this.state.month}
                  placeholder="Select a month"
                  key="month"
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
  {
    signupUser, createBanner, checkUsername, clearBanner,
  })(SignUp));
