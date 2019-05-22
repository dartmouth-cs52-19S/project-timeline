/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TimeElement from './time-element';
import TimeDetail from './time-detail';
import { fetchTimeline, selectTimeline } from '../actions';
import BackButton from '../components/backbutton';

class Timeline extends Component {
  componentWillMount() {
    console.log('IN COMPONENT WILL MOUNT');
    if (this.props.match.params.timelineID === undefined) {
      this.props.fetchTimeline();
    } else {
      this.props.selectTimeline(this.props.match.params.timelineID);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('IN COMPONENT DID update');
    if (this.props.match.params.timelineID !== undefined) {
      if (prevProps.match.params.timelineID !== this.props.match.params.timelineID) {
        this.props.selectTimeline(this.props.match.params.timelineID);
      }
    }
  }

  render() {
    console.log(`state of selected is${this.props.selected}`);
    if (this.props.selected === 0) {
      return (
        <div>
          <div className="foodHeader">
            Discover the Possibilities
          </div>
          <div>
            <BackButton
              className="disabled-backbutton"
              enabled="false"
            />
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
        <div>
          <BackButton
            curr_url={this.props.match.params.timelineID}
            selectTimeline={this.props.selectTimeline}
          />
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
  }
);


export default withRouter(connect(mapStateToProps, { fetchTimeline, selectTimeline })(Timeline));
