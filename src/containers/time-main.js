import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from '../components/main';
import { fetchTimeline } from '../actions';


class TimeMain extends Component {
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
          <Main
            key={events.id}
            id={events.id}
            title={events.title}
            onSelect={this.props.onSelect}
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


export default withRouter(connect(mapStateToProps, { fetchTimeline })(TimeMain));
