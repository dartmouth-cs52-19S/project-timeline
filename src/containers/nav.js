import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { signoutUser, onAddUpdate } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onSignOut = this.onSignOut.bind(this);
  }

  onSignOut() {
    this.props.signoutUser(this.props.history);
  }

  render() {
    // set the links based on authentication
    const account = this.props.authenticated
      ? (
        <li onClick={this.onSignOut}>
          <button type="button" className="signButton">Sign Out</button>
        </li>
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
                <i className="fas fa-stream grow" />
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
            <li>
              {/* Add */}
              <NavLink
                to="/newTime"
                className="link"
                activeClassName="selectedLink"
                // onClick={this.onAddUpdate(1)}
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
                // onClick={this.onAddUpdate(1)}
              >
                <i className="fas fa-pen grow" />
              </NavLink>
            </li>
            {account}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
    addupdate: state.addupdate,
  }
);

export default withRouter(connect(mapStateToProps, { signoutUser, onAddUpdate })(Nav));
