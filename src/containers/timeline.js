/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Main from '../components/main';
import TimeElement from './time-element';
import TimeDetail from './time-detail';
import { fetchTimeline } from '../actions';


class Timeline extends Component {
  render() {
    return (
      <div>
        <div className="foodHeader">
        Discover the Possibilities
        </div>
        <div className="flex">
          <div className="flex-detail">
            <TimeDetail />
          </div>
          <div className="flex-main">
            <TimeElement />
          </div>
        </div>
      </div>


    );
  }
}

const mapStateToProps = state => (
  {
    timeline: state.timeline,
  }
);


export default withRouter(connect(mapStateToProps, { fetchTimeline })(Timeline));
