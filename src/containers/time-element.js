import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Element from '../components/element';
import { fetchTimeline, selectTimeline } from '../actions';


class TimeElement extends Component {
  componentWillMount() {
    this.props.fetchTimeline();
    console.log('componentWillMount success');
  }

  render() {
    if (this.props.selected === 0) {
      console.log(`fetched timeline:  ${this.props.timeline.events}`);
      if (this.props.timeline.events === undefined) {
        return (<div>Loading...</div>);
      }
      console.log('time-main render');
      return (this.props.timeline.events.map((events) => {
        return (
          <div className="padding">
            <Element
              key={events.id}
              id={events.id}
              title={events.title}
              selectTimeline={this.props.selectTimeline}
            />
          </div>
        );
      })
      );
    } else {
      return (this.props.selected.events.map((events) => {
        return (
          <div className="padding">
            <Element
              key={events.id}
              id={events.id}
              title={events.title}
              selectTimeline={this.props.selectTimeline}
            />
          </div>
        );
      })
      );
    }
    // return (<div>{timeline}</div>);
  }
}

const mapStateToProps = state => (
  {
    timeline: state.timeline,
    selected: state.selected,
  }
);


export default withRouter(connect(mapStateToProps, { fetchTimeline, selectTimeline })(TimeElement));