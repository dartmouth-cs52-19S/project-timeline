import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { signoutUser } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.onSignOut = this.onSignOut.bind(this);
  }

  onSignOut() {
    this.props.signoutUser(this.props.history);
  }

  render() {
    // set the links based on authentication
    const account = this.props.authenticated
      ? (
        <li onClick={this.onSignOut}>Sign Out</li>
      )
      : (
        <span>
          <li><NavLink to="/signup" className="link">Sign Up</NavLink></li>
          <li><NavLink to="/signin" className="link">Sign In</NavLink></li>
        </span>
      );

    return (
      <nav className="header">
        <ul>
          {/* Changed from home: / */}
          <li><NavLink exact to="/" className="link">Explore</NavLink></li>
          {/* Chagned from new event: /posts/new */}
          <li><NavLink to="/personal" className="link">Personal</NavLink></li>
          <li><NavLink to="/settings" className="link">Settings</NavLink></li>
          {account}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
