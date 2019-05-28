import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Detail from '../components/detail';
import { fetchTimeline, userTimeline } from '../actions';


class TimeCard extends Component {
  componentWillMount() {
    this.props.userTimeline(this.props.user.timeline);
    console.log(`detail ID${this.props.selected}`);
  }

  //   componentWillUpdate() {
  //     this.props.fetchTimelineDetail(this.props.selected.id);
  //     console.log('updated Detail');
  //   }

  render() {
    if (this.props.user_timeline === undefined) {
      return (<div>Loading...</div>);
    }

    return (this.props.user_timeline.events.map((events) => {
      return (
        <div key={events.id} className="padding">
          <p>hello</p>
          <p>{events.title}</p>
        </div>
      );
    })
    );
    // return (
    //   <div>
    //     <Detail
    //       key={this.props.user_timeline.id}
    //       title={this.props.user_timeline.title}
    //       content={this.props.user_timeline.content}
    //       cover_url={this.props.user_timeline.cover_url}
    //       events={this.props.user_timeline.events}
    //       _id={this.props.user_timeline._id}
    //       add={this.props.add}
    //     />
    //   </div>
    // );
  }
}

const mapStateToProps = state => (
  {
    timeline: state.timeline,
    user: state.user,
    user_timeline: state.user_timeline,
  }
);


export default withRouter(connect(mapStateToProps,
  { fetchTimeline, userTimeline })(TimeCard));
