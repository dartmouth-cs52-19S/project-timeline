import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Detail from '../components/detail';
import { fetchTimeline, saveTimeline } from '../actions';


class TimeDetail extends Component {
  componentWillMount() {
    this.props.fetchTimeline();
  }

  render() {
    if (this.props.selected === undefined) {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <Detail
          key={this.props.selected.id}
          title={this.props.selected.title}
          content={this.props.selected.content}
          cover_url={this.props.selected.cover_url}
          events={this.props.selected.events}
          _id={this.props.selected._id}
          add={this.props.add}
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


export default withRouter(connect(mapStateToProps,
  { fetchTimeline, add: saveTimeline })(TimeDetail));
