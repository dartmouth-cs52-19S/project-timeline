/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Main from '../components/main';
import TimeElement from './time-element';
import TimeDetail from './time-detail';
import { fetchTimeline, onAddUpdate } from '../actions';


class Timeline extends Component {
  componentWillMount() {
    this.props.onAddUpdate(0);
  }

  render() {
    console.log(`state of selected is${this.props.selected}`);
    if (this.props.selected === 0) {
      return (
        <div>
          <div className="foodHeader">
        Discover the Possibilities
          </div>
          <div className="flex">
            <div className="flex-detail" />
            <div className="flex-main">
              <TimeElement />
            </div>
          </div>
        </div>
      );
    }
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
    selected: state.selected,
    addupdate: state.addupdate,
  }
);


export default withRouter(connect(mapStateToProps, { fetchTimeline, onAddUpdate })(Timeline));
