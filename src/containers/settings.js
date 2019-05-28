import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';
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
  'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
];

class Settings extends Component {
  constructor(props) {
    super(props);
    // console.log('yoooooo', this.props.user.startTime);
    this.state = {
      newEmail: '',
      newUsername: '',
      newPassword1: '',
      newPassword2: '',
      newStartTime: '',
      newYear: '',
      newMonth: '',
      hidden: true,
    };
    this.onCancel = this.onCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.edit = this.edit.bind(this);
    this.convertStartTime = this.convertStartTime.bind(this);
    this.createStartTime = this.createStartTime.bind(this);
    this.monthChange = this.monthChange.bind(this);
    this.yearChange = this.yearChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchUserInfo();
    console.log('init props', this.props);
    console.log('initStartTime', this.props.user.startTime);
    this.convertStartTime();
    console.log('newTime', this.newTime);
  }

  onCancel(event) {
    this.props.history.push('/explore/start');
  }

  // makes the HS grad time unix obj really pretty
  // convertStartTime = (oldTime) => {
  //   let newTime = '';
  //   let datePrettier = '';
  //   // eslint-disable-next-line no-restricted-globals
  //   const isDate = Object.prototype.toString.call(oldTime) ===
  // '[object Date]' && !isNaN(oldTime);
  //   if (oldTime !== null && isDate) {
  //     const datePretty = oldTime.toDateString(); // e.g. Sun May 01 2019
  //     datePrettier = datePretty.replace(' 01', ''); // Sun May 2019
  //     if (datePrettier.includes('Sun')) { // May 2019
  //       newTime = datePrettier.replace('Sun ', '');
  //     } else if (datePrettier.includes('Mon')) { // May 2019
  //       newTime = datePrettier.replace('Mon ', '');
  //     } else if (datePrettier.includes('Tue')) { // May 2019
  //       newTime = datePrettier.replace('Tue ', '');
  //     } else if (datePrettier.includes('Wed')) { // May 2019
  //       newTime = datePrettier.replace('Wed ', '');
  //     } else if (datePrettier.includes('Thu')) { // May 2019
  //       newTime = datePrettier.replace('Thu ', '');
  //     } else if (datePrettier.includes('Fri')) { // May 2019
  //       newTime = datePrettier.replace('Fri ', '');
  //     } else if (datePrettier.includes('Sat')) { // May 2019
  //       newTime = datePrettier.replace('Sat ', '');
  //     }
  //     return newTime;
  //   } else {
  //     this.props.createBanner('Sorry this is not working right now!');
  //     setTimeout(() => {
  //       this.props.clearBanner();
  //     }, 3000);
  //     return ' lollll katie';
  //   }
  // }

  // checks if email is a valid email
  // adapted from https://tylermcginnis.com/validate-email-address-javascript/
  checkEmail = (email) => {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  toggleShow() {
    console.log('toggling');
    if (this.state.newPassword1 === '' && this.state.newPassword2 === '') {
      this.props.createBanner('Please enter a password to see it');
      setTimeout(() => {
        this.props.clearBanner();
      }, 2000);
    // eslint-disable-next-line react/no-access-state-in-setstate
    } else this.setState({ hidden: !this.state.hidden });
  }

  convertStartTime() {
    let newTime = '';
    let datePretty = '';
    console.log('convert fxn start time', this.props.user.startTime);
    const oldTime = this.props.user.startTime;
    console.log('old time ', oldTime);
    const dateTest = new Date(this.props.user.startTime);
    console.log('barrys thing ', dateTest.getFullYear());
    console.log('barrys thing ', dateTest.getMonth());
    // console.log('barrys thing ', typeof this.props.user.startTime);
    // console.log('barrys thing ', this.props.user.startTime.getFullYear());
    // console.log('barrys thing ', this.props.user.startTime.getMonth());
    if (oldTime !== null) {
      datePretty = oldTime.replace('-01T05:00:00.000Z', ''); // e.g. 2005-01-01T05:00:00.000Z
      const datePrettier = datePretty.replace('-', '/'); // e.g. 2005-01
      console.log('datePrettier ', datePrettier);
      if (datePrettier.includes('1')) { // 2005/Jan
        newTime = datePrettier.replace('Jan', '');
        console.log('newRime Jan', newTime);
      } else if (datePrettier.includes('02]')) { // 2005/Feb
        newTime = datePrettier.replace('Feb', '');
        console.log('newRime Feb', newTime);
      } else if (datePrettier.includes('03')) { // 2005/March
        newTime = datePrettier.replace('March', '');
      } else if (datePrettier.includes('04')) { // 2005/Jan
        newTime = datePrettier.replace('April', '');
      } else if (datePrettier.includes('05')) { // 2005/Jan
        newTime = datePrettier.replace('May', '');
      } else if (datePrettier.includes('06')) { // 2005/Jan
        newTime = datePrettier.replace('June', '');
      } else if (datePrettier.includes('07')) { // 2005/Jan
        newTime = datePrettier.replace('July', '');
      } else if (datePrettier.includes('08')) { // 2005/Jan
        newTime = datePrettier.replace('Aug', '');
      } else if (datePrettier.includes('09')) { // 2005/Jan
        newTime = datePrettier.replace('Sept', '');
      } else if (datePrettier.includes('10')) { // 2005/Jan
        newTime = datePrettier.replace('Oct', '');
      } else if (datePrettier.includes('11')) { // 2005/Jan
        newTime = datePrettier.replace('Nov', '');
      } else if (datePrettier.includes('12')) { // 2005/Jan
        newTime = datePrettier.replace('Nov', '');
      }
      console.log('newTime ', newTime);
      return newTime;
    } else {
      this.props.createBanner('Sorry this is not working right now!');
      setTimeout(() => {
        this.props.clearBanner();
      }, 3000);
      return ' lollll katie';
    }
  }


  monthChange(e) {
    this.setState({ month: e.value });
  }

  yearChange(e) {
    this.setState({ year: e.value });
  }

  // makes the pretty string super ugly again :(( hello date obj
  createStartTime() { // changes the expected HS grad date to a date obj
    let numMonth = 0;
    switch (this.state.month) {
      case 'Jan':
        break;
      case 'Feb':
        numMonth = 1;
        break;
      case 'March':
        numMonth = 2;
        break;
      case 'April':
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
    const newDate = new Date(numYear, numMonth, 1);
    this.setState({ newStartTime: newDate });
  }

  // update fxn for all fields wahoo
  edit(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    // if anything is left blank by the user, just keep the same old info
    if (this.state.newEmail !== '' && !this.checkEmail(this.state.newEmail)) { // bad email check
      this.props.createBanner('Please enter a valid email.');
      setTimeout(() => {
        this.props.clearBanner();
      }, 3000);
      return false;
    }
    if (this.state.email !== '' && this.checkEmail(this.state.newEmail)) {
      this.state.newEmail = this.props.user.email;
    } if (this.state.newPassword1 !== this.state.newPassword2) {
      this.props.createBanner('Your passwords do not match!');
      setTimeout(() => {
        this.props.clearBanner();
      }, 3000);
      return false;
    } else { // FINALLY save the user obj and update it
      this.props.createBanner('You have saved your settings. Thanks!');
      setTimeout(() => {
        this.props.clearBanner();
      }, 3000);
      const fields = {
        email: this.state.newEmail,
        username: this.state.newUsername,
        password: this.state.newPassword1,
        startTime: this.state.newStartTime,
      };
      this.props.updateUser(fields, this.props.history);
      return true;
    }
  }
  // want to call fxn if user exists (which returns a t/f) onChange for username so realtime

  render() {
    if (this.props.user == null) {
      return (
        <div className="flex" style={{ alignItems: 'flex-end', justifyContent: 'space-around' }}>
          <h1>Loading</h1>
        </div>
      );
    } else {
      return (
        <div>
          <div className="settingsHeader">
            Settings
            Still working on start time
          </div>
          <div>
            current username: {this.props.user.username}
          </div>
          <div className="username">
            <input
              name="newUsername"
              placeholder="new username"
              onChange={this.edit}
              value={this.state.newUsername}
              className="signinput"
            />
          </div>
          <div>
            current email: {this.props.user.email}
          </div>
          <div className="email">
            <input
              name="newEmail"
              placeholder="new email"
              onChange={this.edit}
              value={this.state.newEmail}
              className="signinput"
            />
          </div>
          <div>
           change your password
          </div>
          <div className="password">
            <input
              name="newPassword1"
              type={this.state.hidden ? 'password' : 'text'}
              value={this.state.newPassword1}
              onChange={this.edit}
              placeholder="new password"
              className="signinput"
            />
            <input
              name="newPassword2"
              type={this.state.hidden ? 'password' : 'text'}
              value={this.state.newPassword2}
              onChange={this.edit}
              placeholder="new password"
              className="signinput"
            />
            <i className="far fa-eye signicon"
              id="passButtonSettings"
              role="button"
              tabIndex={0}
              onClick={this.toggleShow}
            />
          </div>
          <div>
            current HS graduation date: {this.props.user.startTime}
          </div>
          <div className="flexWideDrop">
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
          <button type="button" onClick={this.onCancel}>Cancel</button>
          <button type="button" onClick={this.handleSubmit}>Save Changes</button>
        </div>
      );
    }
  }
}
const mapStateToProps = reduxState => (
  {
    user: reduxState.user,
  }
);
// export default withRouter(connect(mapStateToProps, null)(Settings));
export default withRouter(connect(mapStateToProps,
  {
    fetchUserInfo, createBanner, updateUser, clearBanner,
  })(Settings));
