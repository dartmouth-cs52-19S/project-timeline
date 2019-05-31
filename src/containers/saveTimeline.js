/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Main from '../components/main';
// import TimeElement from './time-element';
// import TimeDetail from './time-detail';
import { fetchTimeline, unsaveTimeline, userTimeline } from '../actions';
import emptyState from '../img/timeline-emptystate.png';


class SaveTimeline extends Component {
  constructor(props) {
    super(props);

    this.renderElement = this.renderElement.bind(this);
    this.handleClicked = this.handleClicked.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.toExplore = this.toExplore.bind(this);
  }

  componentWillMount() {
    if (this.props.user_timeline === null) {
      this.props.userTimeline(this.props.user.timeline);
    } else {
      this.props.userTimeline(this.props.user.timeline);
    }
  }

  componentDidUpdate() {
    this.props.userTimeline(this.props.user.timeline);
  }

  handleClicked(e, event) {
    this.props.history.push(`/explore/${event}`);
  }

  toExplore() {
    this.props.history.push('/explore/start');
  }

  handleRemove(e, eventId) {
    e.preventDefault();
    this.props.unsaveTimeline(eventId);
  }

  renderElement() {
    if (this.props.user_timeline === 0) {
      if (this.props.user_timeline.events === undefined) {
        return (
          <div>
            <h1>Loading</h1>
          </div>
        );
      }
    }
    if (this.props.user_timeline.events !== undefined) {
      if (this.props.user_timeline.events.length === 0) {
        return (
          <div>
            <div className="middle">
              <img src={emptyState} alt="nothing here" className="emptyState" />
            </div>
            <div className="middleText">
              <p className="h7">You have no Saved Timelines Yet!</p>
            </div>
            <div className="middleText">
              <p className="h8">Go to the <em onClick={this.toExplore}>Explore Page </em>to discover timelines you can keep.</p>
            </div>
          </div>
        );
      }
    }
    return (this.props.user_timeline.events.map((event) => {
      return (
        <div className="detailContainerSaved" key={event.id}>
          <div className="detailTitle">
            <span>{event.title}</span>
            <div>
              <button
                type="button"
                className="button-grey"
                onClick={(e => this.handleRemove(e, event.id))}
              >
                <i className="far fa-bookmark" /> Unsave
              </button>
              <i className="fas fa-external-link-alt grow" key={event.id} name={event.id} onClick={(e => this.handleClicked(e, event.id))} />
            </div>
          </div>
          <div className="detailContent">
            {event.content}
          </div>
        </div>
      );
    })
    );
  }

  render() {
    if (this.props.user_timeline === null) {
      return (
        <div><h1>Loading</h1></div>
      );
    }
    return (
      <div>
        <div className="foodHeader">
            Your Saved Timelines
        </div>
        <div className="flex wrap">
          {this.renderElement()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    timeline: state.timeline,
    user_timeline: state.user_timeline,
    user: state.auth.user,
  }
);


export default withRouter(connect(mapStateToProps,
  { fetchTimeline, unsaveTimeline, userTimeline })(SaveTimeline));
