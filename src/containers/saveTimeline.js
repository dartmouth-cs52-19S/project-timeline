/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Main from '../components/main';
// import TimeElement from './time-element';
// import TimeDetail from './time-detail';
import { fetchTimeline, saveToTimeline, userTimeline } from '../actions';


class SaveTimeline extends Component {
  constructor(props) {
    super(props);

    this.renderElement = this.renderElement.bind(this);
    this.handleClicked = this.handleClicked.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillMount() {
    this.props.userTimeline(this.props.user.timeline);
    console.log(`detail ID${this.props.selected}`);
  }

  handleClicked(e, event) {
    console.log(`event is ${event}`);
    // console.log(`e.currtarget.name is  ${e.target.name}`);
    this.props.history.push(`/explore/${event}`);
  }

  handleRemove(e, eventId) {
    // insert remove funcitonality here
  }

  renderElement() {
    if (this.props.user_timeline === 0) {
      console.log('is zero');
      return (
        <div>
          <div className="foodHeader">
          Discover the Possibilities
          </div>
          <div className="flex">
            <div className="flex-detail" />
            <div className="flex-main" />
          </div>
        </div>
      );
    }
    console.log('nowhere');
    return (this.props.user_timeline.events.map((event) => {
      console.log(`event.id is ${event.id}`);
      return (
        <div key={event.id} name={event.id} className="detailContainerSaved">
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
              <i className="fas fa-external-link-alt grow" name={event.id} onClick={(e => this.handleClicked(e, event.id))} />
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
    user: state.user,
  }
);


export default withRouter(connect(mapStateToProps,
  { fetchTimeline, saveToTimeline, userTimeline })(SaveTimeline));
