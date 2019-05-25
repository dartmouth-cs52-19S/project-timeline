/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Main from '../components/main';
import TimeElement from './time-element';
import TimeDetail from './time-detail';
import { fetchTimeline, saveToTimeline } from '../actions';


class SaveTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currTimeline: this.props.selected,
    };
  }

  componentDidMount = () => {
    if (this.props.selected !== 0 && this.state.currTimeline !== this.props.selected) {
      console.log('saving');
      this.props.saveToTimeline(this.props.selected.id);
      this.setState({ currTimeline: this.props.selected });
    }
  }

  componentDidUpdate = () => {
    console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUDGHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
    console.log(this.state.currTimeline);
    console.log(this.props.selected);
    if (this.state.currTimeline !== this.props.selected) {
      console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUDGHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
      console.log('saving');

      this.props.saveToTimeline(this.props.selected);
      this.setState({ currTimeline: this.props.selected });
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
  }
);


export default withRouter(connect(mapStateToProps,
  { fetchTimeline, saveToTimeline })(SaveTimeline));
