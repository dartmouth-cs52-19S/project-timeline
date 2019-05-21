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
      <div className="flex">
        <div className="flex-detail">
          <TimeDetail />
        </div>
        <div className="flex-main">
          <TimeElement />
        </div>
      </div>

    );
    // console.log(`fetched timeline:  ${this.props.timeline.events}`);
    // if (this.props.timeline.events === undefined) {
    //   return (<div>Loading...</div>);
    // }
    // console.log('time-main render');
    // return (this.props.timeline.events.map((events) => {
    //   return (
    //     <div className="padding">
    //       <p>hello</p>
    //       <Main
    //         key={events.id}
    //         title={events.title}
    //       />
    //     </div>
    //   );
    // })
    // );
    // return (<div>{timeline}</div>);
  }
}

const mapStateToProps = state => (
  {
    timeline: state.timeline,
  }
);


export default withRouter(connect(mapStateToProps, { fetchTimeline })(Timeline));
