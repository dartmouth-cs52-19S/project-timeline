import React, { Component } from 'react';
import Element from './element';


class Timeline extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

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
          <div key={events.id} className="padding">
            <Element
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
            <Element
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


export default Timeline;
