/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createPost } from '../actions';

class CreateTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
    title: '',
    events: [], // Array of reference IDs to other timelines for individual events 
    filter: '',
    content: '',
    time: new Date(), // Associated relative prep time
    cover_url: '', // Image URL 
        
      errorTitle: 'postTitle',
      errorTags: 'postTags',
      errorCover: 'postCover',
      hasEdited: 0,
      hasMoved: 0,
      hasMovedTag: 0,
    };

    this.edit = this.edit.bind(this);
    this.handleTitleBlur = this.handleTitleBlur.bind(this);
    this.handleTagBlur = this.handleTagBlur.bind(this);
    this.handleContentBlur = this.handleContentBlur.bind(this);
    this.handleCoverURLBlur = this.handleCoverURLBlur.bind(this);
    this.validURL = this.validURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({ hasMoved: 1 });
    if (!this.state.title) {
      this.setState({ errorTitle: 'errorTitle' });
    } else {
      this.setState({ errorTitle: 'postTitle' });
    }
  }

  handleTagBlur() {
    this.setState({ hasMovedTag: 1 });
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

  handleSubmit() {
    this.props.createPost({
      title: this.state.title, content: this.state.content, tags: this.state.tags, cover_url: this.state.cover_url,
    }, this.props.history);
    this.props.history.push(`/post/${this.props.match.params.postID}`);
  }

  renderNewPost() {
    // show submit button based on whether all fields are correctly filled
    let submit;
    if (this.state.hasEdited === 1 && this.state.hasMoved === 1 && this.state.hasMovedTag === 1 && this.state.errorTitle === 'postTitle' && this.state.errorTags === 'postTags' && this.state.errorCover === 'postCover') {
      submit = <button type="button" onClick={this.handleSubmit}>Submit</button>;
    } else {
      submit = '';
    }

    return (
      <div>
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
            name="tags"
            className={this.state.errorTags}
            placeholder="Location and Time"
            onChange={this.edit}
            onBlur={this.handleTagBlur}
            value={this.state.tags}
          />
          <em>* Required</em>
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
          {this.state.errorCover === 'error_box' ? <em>Not a valid URL</em> : ''}
        </div>
        <Link className="link" to="/">
          <button type="button">Cancel</button>
        </Link>
        {submit}
      </div>
    );
  }

  render() {
    return (
      <div className="post">
        <div className="newPostHeader">
        Create a New Timeline!
        </div>
        <div>{this.renderNewPost()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => (
    {
      timeline: state.timeline
    },
  );
  

export default withRouter(connect(mapStateToProps, { CreateTimeline })(CreateTimeline));
