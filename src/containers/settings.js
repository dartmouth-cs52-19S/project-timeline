import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import Particles from 'react-particles-js';
import {
  fetchUserInfo, createBanner, clearBanner, updateUser,
} from '../actions';

// date dropdown stuff
const optionsYear = [
  '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014',
  '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025',
  '2026', '2027', '2028', '2029', '2030',
];
const optionsMonth = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
];

// particles stuff
const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    image: {
      height: 1000,
    },
  },
};


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: '',
      newUsername: '',
      newPassword1: '',
      newPassword2: '',
      newYear: '',
      newMonth: '',
      hidden: true,
    };
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlesSubmit = this.handlesSubmit.bind(this);
    this.edit = this.edit.bind(this);
    this.displayStartTime = this.displayStartTime.bind(this);
    this.createStartTime = this.createStartTime.bind(this);
    this.convertStartTime = this.convertStartTime.bind(this);
    this.monthChange = this.monthChange.bind(this);
    this.yearChange = this.yearChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchUserInfo();
  }

  onCancel(event) {
    this.props.history.push('/explore/start');
  }

  // checks if email is a valid email
  // adapted from https://tylermcginnis.com/validate-email-address-javascript/
  checkEmail = (email) => {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  toggleShow() {
    if (this.state.newPassword1 === '' && this.state.newPassword2 === '') {
      this.props.createBanner('Please enter a password to see it.');
      setTimeout(() => {
        this.props.clearBanner();
      }, 2000);
    // eslint-disable-next-line react/no-access-state-in-setstate
    } else this.setState({ hidden: !this.state.hidden });
  }

  convertStartTime() { // need to do this bc Mongoose returns startTime as a string
    const dateObj = new Date(this.props.user.startTime);
    return dateObj;
  }

  // makes the HS grad time date obj really pretty
  displayStartTime() {
    let currMonth = 0;
    let currYear = 0;
    if (this.props.user !== null) {
      const dateObj = this.convertStartTime(); // string => dateObj
      currMonth = dateObj.getMonth();
      switch (currMonth) {
        case 0:
          currMonth = 'Jan';
          break;
        case 1:
          currMonth = 'Feb';
          break;
        case 2:
          currMonth = 'March';
          break;
        case 3:
          currMonth = 'April';
          break;
        case 4:
          currMonth = 'May';
          break;
        case 5:
          currMonth = 'June';
          break;
        case 6:
          currMonth = 'July';
          break;
        case 7:
          currMonth = 'Aug';
          break;
        case 9:
          currMonth = 'Sept';
          break;
        case 10:
          currMonth = 'Oct';
          break;
        case 11:
          currMonth = 'Nov';
          break;
        case 12:
          currMonth = 'Dev';
          break;
        default:
          currMonth = 'Jan';
          break;
      }
      currYear = dateObj.getFullYear();
      const currTime = `${currYear.toString()}-${currMonth}`;
      return currTime;
    } else {
      this.props.createBanner('Sorry this is not working right now!');
      setTimeout(() => {
        this.props.clearBanner();
      }, 3000);
      return ' lollll sorry not working';
    }
  }


  monthChange(e) {
    this.setState({ newMonth: e.value });
  }

  yearChange(e) {
    this.setState({ newYear: e.value });
  }

  // makes the pretty string super ugly again :(( hello date obj
  createStartTime() { // changes the expected HS grad date to a date obj
    let numMonth = 0;
    switch (this.state.newMonth) {
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
    const numYear = parseInt(this.state.newYear, 10);
    const newDate = new Date(numYear, numMonth, 1);
    return newDate;
  }

  // update fxn for all fields wahoo
  edit(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handlesSubmit(event) {
    event.preventDefault();
    // FINALLY save the user fields, make startTime, and update it
    const fields = {};
    // if anything is left blank by the user, don't add it to fields
    if (this.state.newEmail !== '') {
      if (this.checkEmail(this.state.newEmail)) { // passes bad email check
        this.props.createBanner('Please enter a valid email.');
        setTimeout(() => {
          this.props.clearBanner();
        }, 3000);
        return false;
      } else {
        fields.email = this.state.newEmail;
      }
    } if (this.state.newUsername !== '') {
      fields.username = this.state.newUsername;
    } if (this.state.newPassword1 !== '' && this.state.newPassword2 !== '') {
      // password matching check
      if (this.state.newPassword1 !== this.state.newPassword2) {
        this.props.createBanner('Your passwords do not match!');
        setTimeout(() => {
          this.props.clearBanner();
        }, 3000);
        return false;
      } else {
        fields.password = this.state.newPassword1;
      }
    } if (this.state.newMonth !== '' && this.state.newYear !== '') {
      fields.startTime = this.createStartTime();
    } if (Object.entries(fields).length !== 0 && fields.constructor === Object) {
      this.props.updateUser(fields, this.props.history);
      // tell the user they did something
      this.props.createBanner('You have saved your settings. Thanks!');
      setTimeout(() => {
        this.props.clearBanner();
      }, 3000);
      return true;
    } else {
      this.props.createBanner('Please enter new information before saving.');
      setTimeout(() => {
        this.props.clearBanner();
      }, 3000);
      return false;
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    // if anything is left blank by the user, just keep the same old info
    if (this.state.newEmail !== '' && this.checkEmail(this.state.newEmail)) { // bad email check
      this.props.createBanner('Please enter a valid email.');
      setTimeout(() => {
        this.props.clearBanner();
      }, 3000);
      return false;
    } if (this.state.newPassword1 !== this.state.newPassword2) {
      this.props.createBanner('Your passwords do not match!');
      setTimeout(() => {
        this.props.clearBanner();
      }, 3000);
      return false;
    } else { // FINALLY make the start Time, save the user obj, and update it
      this.props.createBanner('You have saved your settings. Thanks!');
      setTimeout(() => {
        this.props.clearBanner();
      }, 3000);

      const fields = {
        email: this.state.newEmail,
        username: this.state.newUsername,
        password: this.state.newPassword1,
        startTime: this.createStartTime(),
      };
      this.props.updateUser(fields, this.props.history);
      return true;
    }
  }

  render() {
    if (this.props.user === null) {
      return (
        <div className="flex" style={{ alignItems: 'flex-end', justifyContent: 'space-around' }}>
          <div className="loading">
            <i className="fas fa-spinner fa-pulse" /> Loading ...
          </div>
        </div>
      );
    } else {
      return (
        <div className="flexWide">
          <div className="setContainer">
            <div className="whiteBox">
              <div className="signin">
                <div className="setText">
                  <h3>Settings</h3>
                  <h6>Come take our
                    <span>
                      <a href="https://www.surveymonkey.com/r/WT9VZT6"> feedback survey!</a>
                    </span>
                  </h6>
                </div>
                <div className="flexWideS">
                  <h6>current username: <span> {this.props.user.username}</span></h6>
                </div>
                <div className="flexWideS">
                  <input
                    name="newUsername"
                    placeholder="new username"
                    onChange={this.edit}
                    value={this.state.newUsername}
                    className="signinput"
                  />
                </div>
                <div className="flexWideS">
                  <h6>current email: <span> {this.props.user.email}</span></h6>
                </div>
                <div className="flexWideS">
                  <input
                    name="newEmail"
                    placeholder="new email"
                    onChange={this.edit}
                    value={this.state.newEmail}
                    className="signinput"
                  />
                </div>

                <div className="flexWideS">
                  <h6>change your password:</h6>
                </div>
                <div className="flexWideS">
                  <input
                    name="newPassword1"
                    type={this.state.hidden ? 'password' : 'text'}
                    value={this.state.newPassword1}
                    onChange={this.edit}
                    placeholder="new password"
                    className="signinput"
                  />
                </div>
                <div className="flexWideS">
                  <input
                    name="newPassword2"
                    type={this.state.hidden ? 'password' : 'text'}
                    value={this.state.newPassword2}
                    onChange={this.edit}
                    placeholder="re-enter password"
                    className="signinput"
                  />
                  <i className="far fa-eye signicon"
                    id="passButtonSettings"
                    role="button"
                    tabIndex={0}
                    onClick={this.toggleShow}
                  />
                </div>
                <div className="flexWideS">
                  <h6>current HS graduation date: <span> {this.displayStartTime()}</span></h6>
                </div>
                <div className="flexWideS">
                  <Dropdown
                    className="flexWide"
                    options={optionsYear}
                    onChange={this.yearChange}
                    value={this.state.newYear}
                    placeholder="Select a year"
                  />
                  <Dropdown
                    className="flexWide"
                    options={optionsMonth}
                    onChange={this.monthChange}
                    value={this.state.newMonth}
                    placeholder="Select a month"
                  />
                </div>
                <div className="signSubmitBox">
                  <button type="button"
                    className="buttonSecondary"
                    onClick={this.onCancel}
                  >Cancel
                  </button>
                  <button type="button"
                    className="buttonCTA"
                    onClick={this.handlesSubmit}
                  >Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="setGraphic">
            <Particles className="particles" params={particlesOptions} />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = reduxState => (
  {
    user: reduxState.auth.user,
  }
);

export default withRouter(connect(mapStateToProps,
  {
    fetchUserInfo, createBanner, updateUser, clearBanner,
  })(Settings));
