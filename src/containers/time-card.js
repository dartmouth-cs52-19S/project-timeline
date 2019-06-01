import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Detail from '../components/detail';
import { fetchTimeline, userTimeline } from '../actions';


class TimeCard extends Component {
  componentWillMount() {
    this.props.userTimeline(this.props.user.timeline);
  }

  render() {
    if (this.props.user_timeline === undefined) {
      return (
        <div className="loading">
          <i className="fas fa-spinner fa-pulse" /> Loading ...
        </div>
      );
    }

    return (this.props.user_timeline.events.map((events) => {
      return (
        <div key={events.id} className="padding">
          <p>hello</p>
          <p>{events.title}</p>
        </div>
      );
    })
    );
  }
}

const mapStateToProps = state => (
  {
    timeline: state.timeline,
    user: state.auth.user,
    user_timeline: state.user_timeline,
  }
);


export default withRouter(connect(mapStateToProps,
  { fetchTimeline, userTimeline })(TimeCard));
