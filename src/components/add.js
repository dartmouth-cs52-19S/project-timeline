/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { onAddUpdate } from '../actions';
import TimeElement from '../containers/time-element';

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      filter: '',
      content: '',
      time: '', // Associated relative prep time
      cover_url: '', // Image URL
      errorTitle: 'postTitle',
      errorTags: 'postTags',
      errorCover: 'postCover',
      hasEdited: 0,
      // hasMoved: 0,
      // hasMovedTag: 0,
    };

    this.edit = this.edit.bind(this);
    this.handleTitleBlur = this.handleTitleBlur.bind(this);
    this.handleTagBlur = this.handleTagBlur.bind(this);
    this.handleContentBlur = this.handleContentBlur.bind(this);
    this.handleCoverURLBlur = this.handleCoverURLBlur.bind(this);
    // this.validURL = this.validURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderNewPost = this.renderNewPost.bind(this);
  }

  // set the initial state if told to in this.props.update
  componentWillMount() {
    if (this.props.update) {
      console.log(typeof this.props.timeline.time);
      const dt = new Date(this.props.timeline.time);
      this.setState({
        title: this.props.timeline.title,
        content: this.props.timeline.content,
        filter: this.props.timeline.filter,
        time: Math.round(dt.getTime() / (60 * 60 * 24 * 30 * 1000)),
        cover_url: this.props.timeline.cover_url,
      });
    }
    console.log(`hopefully not undefined${this.props.addupdate}`);
    this.props.onAddUpdate(1);
  }

  displayTimelineName() {
    if (this.props.timeline.title === undefined) {
      return (
        'Root'
      );
    } return (
      this.props.timeline.title
    );
  }

  // TODO Add onblur for coverURL
  // then can remove the setstate above
  handleCoverURLBlur() {
    if (!this.validURL(this.state.cover_url)) {
      console.log('URL is bad');
      this.setState({ errorCover: 'error_box' });
    } else {
      console.log('URL is good');
      this.setState({ errorCover: 'postCover' });
    }
  }

  handleContentBlur() {
    if (!this.state.content) {
      console.log('no content but that is OK');
    }
  }

  handleTitleBlur() {
    // this.setState({ hasMoved: 1 });
    if (!this.state.title) {
      this.setState({ errorTitle: 'errorTitle' });
    } else {
      this.setState({ errorTitle: 'postTitle' });
    }
  }

  handleTagBlur() {
    // this.setState({ hasMovedTag: 1 });
    if (!this.state.tags) {
      console.log('no tags');
      this.setState({ errorTags: 'errorTags' });
    } else {
      this.setState({ errorTags: 'postTags' });
    }
  }

  edit(e) {
    this.setState({ hasEdited: 1, [e.target.name]: e.target.value });
  }

  // Adapted from https://stackoverflow.com/questions/13373504/what-is-a-valid-url-query-string
  validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  handleSubmit(addNextUnder) {
    // this.props.createPost({
    //   title: this.state.title, content: this.state.content,
    //   tags: this.state.tags, cover_url: this.state.cover_url,
    // }, this.props.history);
    // this.props.history.push(`/post/${this.props.match.params.postID}`);
    const time = new Date(parseInt(this.state.time, 10) * 2629746000);
    let fields;
    if (this.props.update) {
      fields = {
        title: this.state.title,
        content: this.state.content,
        filter: this.state.filter,
        cover_url: this.state.cover_url,
        time,
        id: this.props.timeline._id,
      };
    } else {
      fields = {
        title: this.state.title,
        content: this.state.content,
        filter: this.state.filter,
        cover_url: this.state.cover_url,
        parent: this.props.timeline._id,
        time,
      };

      // reset the state
      this.setState({
        title: '',
        filter: '',
        content: '',
        time: '',
        cover_url: '',
      });
    }

    this.props.createTimeline(fields, addNextUnder);

    console.log(fields);
  }

  renderNewPost() {
    // show submit button based on whether all fields are correctly filled
    let submit; // par;
    if (this.state.hasEdited === 1) {
      submit = (
        <div>
          <button type="button" onClick={() => this.handleSubmit(true)}>
            Submit (next: under)
          </button>
          <button type="button" onClick={() => this.handleSubmit(false)}>
            Submit (next: adjacent)
          </button>
        </div>
      );
    } else {
      submit = '';
    }

    // if (this.props.timeline) {
    //   par = this.props.timeline.title;
    // }
    const addEdit = this.props.update ? 'update' : 'add a new step under';
    console.log(this.props.timeline);
    return (
      <div>
        <div className="callOut">
          You are about to {addEdit} <em>{this.displayTimelineName()}</em>.
        </div>
        <div>
          <input
            name="title"
            className={this.state.errorTitle}
            placeholder="Title of Event"
            onChange={this.edit}
            onBlur={this.handleTitleBlur}
            value={this.state.title}
          />
          <em>* Required</em>
        </div>
        <div>
          <input
            name="filter"
            className={this.state.errorTags}
            placeholder="Filter Term"
            onChange={this.edit}
            onBlur={this.handleTagBlur}
            value={this.state.filter}
          />
          {/* <em>* Required</em> */}
        </div>
        <div>
          <input
            name="time"
            className={this.state.errorTags}
            placeholder="Time IN MONTHS SINCE HIGH SCHOOL"
            onChange={this.edit}
            onBlur={this.handleTagBlur}
            value={(this.state.time)}
          />
          {/* <em>* Required</em> */}
        </div>
        <div className="postContent">
          <textarea
            name="content"
            placeholder="Event Description"
            onChange={this.edit}
            onBlur={this.handleContentBlur}
            value={this.state.content}
          />
        </div>
        <div className="postContent">
          <input
            name="cover_url"
            className={this.state.errorCover}
            placeholder="Image URL Link"
            onChange={this.edit}
            onBlur={this.handleCoverURLBlur}
            value={this.state.cover_url}
          />
          {/* {this.state.errorCover === 'error_box' ? <em>Not a valid URL</em> : ''} */}
        </div>
        <Link className="link" to="/">
          <button type="button">Cancel</button>
        </Link>
        {this.props.update
          ? (
            <button
              type="button"
              onClick={() => {
                this.props.delete(this.props.timeline, this.props.history);
              }}
            >
              Delete
            </button>
          )
          : ''
          }
        {submit}
      </div>
    );
  }

  render() {
    const addEditTitle = this.props.update ? 'Update Timeline Info!' : 'Create a New Timeline!';
    return (
      <div>
        <div className="newPostHeader">
          {addEditTitle}
        </div>
        <div className="addContainerFull">
          <div className="post">
            <div>{this.renderNewPost()}</div>
          </div>
          <div>
            <div className="callOut">
          Current Timeline Display for <em>{this.displayTimelineName()}</em>
            </div>
            <div className="addContainer">
              <div className="addContainerTimeline">
                <TimeElement />
              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

// export default AddForm;
const mapStateToProps = state => (
  {
    addupdate: state.addupdate,
  }
);

export default withRouter(connect(mapStateToProps, { onAddUpdate })(AddForm));
