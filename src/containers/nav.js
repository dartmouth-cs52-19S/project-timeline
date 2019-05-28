import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { signoutUser, onAddUpdate, fetchUserInfo } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
  }

  onSignOut() {
    this.props.signoutUser(this.props.history);
  }

  componentWillMount = () => {
    if (this.props.authenticated) {
      console.log('I AM AUTHENTICTED');
      this.props.fetchUserInfo();
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.auth.user.admin === undefined) {
      this.props.fetchUserInfo();
    }
  }

  render() {
    // set the links based on authentication
    console.log('NAV BAR PROPS', this.props);
    console.log('nav bar user', this.props.user);

    const account = (this.props.authenticated && this.props.user !== null)
      ? (
        <span>
          <div className="flex">
            <li>
              {/* Saved */}
              <NavLink
                exact
                // to={`/explore/${this.props.user.timeline}`}
                to="/save"
                className="link"
                activeClassName="selectedLink"
              >
                <i className="far fa-bookmark grow" />
              </NavLink>
            </li>
            <li>
              {/* Personal */}
              <NavLink to="/personal" className="link" activeClassName="selectedLink">
                <i className="far fa-user grow" />
              </NavLink>
            </li>
            <li>
              {/* Settings */}
              <NavLink to="/settings" className="link" activeClassName="selectedLink">
                <i className="fas fa-cog fa-spin-hover" />
              </NavLink>
            </li>
            <li onClick={this.onSignOut}>
              <button type="button" className="signButton">Sign Out</button>
            </li>
          </div>
        </span>
      )
      : (
        <span>
          <div className="flex">
            <li>
              <NavLink to="/signin" className="link signinButton">
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="link">
                <button type="button" className="signButton">
                Sign Up
                </button>
              </NavLink>
            </li>
          </div>

        </span>
      );
    // Show add/update timeline info buttons only if admin auth

    const admin = (this.props.authenticated
      && this.props.auth.user !== null && this.props.user.admin)
      ? (
        <span>
          <div className="flex">
            <li>
              {/* Add */}
              <NavLink
                to="/newTime"
                className="link"
                activeClassName="selectedLink"
              >
                <i className="fas fa-plus grow" />
              </NavLink>
            </li>
            <li>
              {/* Update */}
              <NavLink
                to="/updateTime"
                className="link"
                activeClassName="selectedLink"
              >
                <i className="fas fa-pen grow" />
              </NavLink>
            </li>
          </div>
        </span>
      )
      : (null);

    return (
      <nav className="header">
        <div>
          <ul>
            <li>
              {/* Home */}
              <NavLink exact to="/" className="link">
                <i className="fas fa-star-of-life fa-spin-hover" /> Logo
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              {/* Explore */}
              <NavLink
                exact
                to="/explore/start"
                className="link"
                activeClassName="selectedLink"
              >
                <i className="fas fa-globe-americas grow" />
              </NavLink>
            </li>
            {admin}
            {account}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
    authenticated: state.auth.authenticated,
    addupdate: state.addupdate,
    user: state.auth.user,
  }
);

export default withRouter(connect(mapStateToProps,
  { signoutUser, onAddUpdate, fetchUserInfo })(Nav));
