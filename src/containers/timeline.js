/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TimeElement from './time-element';
import TimeDetail from './time-detail';
import { fetchTimeline, selectTimeline, onAddUpdate } from '../actions';
import BackButton from '../components/backbutton';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };

    this.selectedZero = this.selectedZero.bind(this);
    this.selectedNotZero = this.selectedNotZero.bind(this);
  }

  componentDidMount() {
    this.props.onAddUpdate(0);
    if (this.props.match.params.timelineID !== undefined) {
      this.selectedNotZero();
      this.props.selectTimeline(this.props.match.params.timelineID);
    } else {
      this.selectedZero();
      this.props.selectTimeline('5ce1b7c6c75aa400347686ee');
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.timelineID !== undefined) {
      if (prevProps.match.params.timelineID !== this.props.match.params.timelineID) {
        this.selectedNotZero();
        this.props.selectTimeline(this.props.match.params.timelineID);
      }
    } else if (prevProps.match.params.timelineID !== undefined) {
      this.selectedZero();
      this.props.selectTimeline('5ce1b7c6c75aa400347686ee');
    }
  }

  selectedNotZero() {
    if (this.props.match.params.timelineID !== undefined) {
      this.setState({ selected: this.props.match.params.timelineID });
    } else {
      this.setState({ selected: '5ce1b7c6c75aa400347686ee' });
    }
  }

  selectedZero() {
    this.setState({ selected: 0 });
  }

  render() {
    if (this.state.selected === 0) {
      return (
        <div>
          <div className="foodHeader">
            Discover the Possibilities
          </div>
          <div>
            <BackButton
              className="backbutton"
              enabled="false"
              timeline={this.state.timeline}
              selected={this.state.selected}
            />
          </div>
          <div className="flex-timeline">
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
            className="backbutton"
            enabled="true"
            timeline={this.state.timeline}
            selected={this.state.selected}
            parent={this.props.selected.parent}
          />
        </div>
        <div className="flex-timeline">
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
    addupdate: 0,
  }
);

export default withRouter(connect(mapStateToProps,
  { fetchTimeline, selectTimeline, onAddUpdate })(Timeline));
