import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Element from '../components/element';
import ElementStatic from '../components/element-static';
import { fetchTimeline, selectTimeline } from '../actions';


class TimeElement extends Component {
  componentWillMount() {
    this.props.fetchTimeline(this.props.match.params.timelineID);
  }

  render() {
    // Timeline that Redirects Page
    if (this.props.addupdate === 0) {
      if (this.props.selected === 0) {
        if (this.props.timeline.events === undefined) {
          return (
            <div className="loading">
              <i className="fas fa-spinner fa-pulse" /> Loading ...
            </div>
          );
        }
        return (this.props.timeline.events.map((events) => {
          return (
            <div key={events.id} className="padding">
              <Element
                key={events.id}
                id={events.id}
                title={events.title}
                selectTimeline={this.props.selectTimeline}
                time={events.time}
                content={events.content}
              />
            </div>
          );
        })
        );
      } else {
        return (this.props.selected.events.map((events) => {
          return (
            <div key={events.id} className="padding">
              <Element
                key={events.id}
                id={events.id}
                title={events.title}
                selectTimeline={this.props.selectTimeline}
                time={events.time}
                content={events.content}
              />
            </div>
          );
        })
        );
      }
    } else if (this.props.selected === 0) {
      if (this.props.timeline.events === undefined) {
        return (<div>Loading...</div>);
      }
      // Timeline that Does Not Redirect Page
      return (this.props.timeline.events.map((events) => {
        return (
          <div key={events.id} className="padding">
            <ElementStatic
              key={events.id}
              id={events.id}
              title={events.title}
              selectTimeline={this.props.selectTimeline}
              time={events.time}
            />
          </div>
        );
      })
      );
    } else {
      return (this.props.selected.events.map((events) => {
        return (
          <div key={events.id} className="padding">
            <ElementStatic
              key={events.id}
              id={events.id}
              title={events.title}
              selectTimeline={this.props.selectTimeline}
              time={events.time}
            />
          </div>
        );
      })
      );
    }
  }
}

const mapStateToProps = state => (
  {
    timeline: state.timeline,
    selected: state.selected,
    addupdate: state.addupdate,
  }
);


export default withRouter(connect(mapStateToProps, {
  fetchTimeline, selectTimeline,
})(TimeElement));
