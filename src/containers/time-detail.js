import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Detail from '../components/detail';
import { fetchTimeline } from '../actions';


class TimeDetail extends Component {
  componentWillMount() {
    this.props.fetchTimeline();
    console.log('componentWillMount success');
  }

  render() {
    console.log(`fetched timeline:  ${this.props.timeline.events}`);
    if (this.props.timeline.events === undefined) {
      return (<div>Loading...</div>);
    }
    console.log('time-main render');
    return (this.props.timeline.events.map((events) => {
      return (
        <div className="padding">
          <Detail
            key={events.id}
            title={events.title}
          />
        </div>
      );
    })
    );
    // return (<div>{timeline}</div>);
  }
}

const mapStateToProps = state => (
  {
    timeline: state.timeline,
  }
);


export default withRouter(connect(mapStateToProps, { fetchTimeline })(TimeDetail));
