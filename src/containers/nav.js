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
    return (
      <nav className="header">
        {this.props.authenticated
          ? (
            <ul>
              <li><NavLink exact to="/" className="link">Home</NavLink></li>
              <li><NavLink to="/posts/new" className="link">New Free Food Event</NavLink></li>
              <li onClick={this.onSignOut}>Sign Out</li>
            </ul>
          )
          : (
            <ul>
              <li><NavLink exact to="/" className="link">Home</NavLink></li>
              <li><NavLink to="/posts/new" className="link">New Free Food Event</NavLink></li>
              <li><NavLink to="/signup" className="link">Sign Up</NavLink></li>
              <li><NavLink to="/signin" className="link">Sign In</NavLink></li>
            </ul>
          )
        }
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

// const Nav = (props) => {
//   return (
//       <nav className="header">
//         <ul>
//           <li><NavLink exact to="/" className="link">Home</NavLink></li>
//           <li><NavLink to="/posts/new" className="link">New Free Food Event</NavLink></li>
//           {/* <li><NavLink to="/about">About</NavLink></li> */}
//         </ul>
//       </nav>
//   );
// };
