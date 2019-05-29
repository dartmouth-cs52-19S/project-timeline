import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';


class Page404 extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push('/explore/start');
    }, 3000);
  }

  render() {
    return (
      <div>
        <div id="spacer">.</div>
        <div id="p404">Page 404</div>
        <div className="t404">
          Hello, this page does not exist!
        </div>
        <div className="t404">
          <span>
            If not redirected to home explore page in 3 seconds, click
          </span>
          <span id="linkexplore">
            <NavLink to="/start/explore" className="link">Here</NavLink>
          </span>
        </div>
      </div>
    );
  }
}

export default withRouter(Page404);
