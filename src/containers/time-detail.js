import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Detail from '../components/detail';
import { fetchTimeline } from '../actions';


class TimeDetail extends Component {
  componentWillMount() {
    this.props.fetchTimeline();
    console.log('componentWillMount Detail success');
    console.log(`detail ID${this.props.selected}`);
  }

  //   componentWillUpdate() {
  //     this.props.fetchTimelineDetail(this.props.selected.id);
  //     console.log('updated Detail');
  //   }

  render() {
    console.log(`fetched timeline:  ${this.props.timeline.events}`);
    if (this.props.selected === undefined) {
      return (<div>Loading...</div>);
    }
    console.log('time-detail render');
    return (
      <div>
        <Detail
          key={this.props.selected.id}
          title={this.props.selected.title}
          content={this.props.selected.content}
          cover_url={this.props.selected.cover_url}
          events={this.props.selected.events}
        />
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


export default withRouter(connect(mapStateToProps, { fetchTimeline })(TimeDetail));
