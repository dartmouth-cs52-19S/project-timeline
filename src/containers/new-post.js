/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createPost } from '../actions';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      content: '',
      cover_url: '',
      errorTitle: 'postTitle',
      errorTags: 'postTags',
      errorCover: 'postCover',
      hasEdited: 0,
      hasMoved: 0,
      hasMovedTag: 0,
      // touched_title: false,
      // touched: {
      //   title: false,
      //   tags: false,
      //   content: false,
      //   cover_url: false,
      // },
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onCoverURLChange = this.onCoverURLChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleBlur = this.handleTitleBlur.bind(this);
    this.handleTagBlur = this.handleTagBlur.bind(this);
    this.handleContentBlur = this.handleContentBlur.bind(this);
    this.handleCoverBlur = this.handleCoverBlur.bind(this);
    this.validURL = this.validURL.bind(this);
    this.renderCover = this.renderCover.bind(this);
  }


  onTitleChange(event) {
    this.setState({ hasEdited: 1 });
    this.setState({ title: event.target.value });
    if (!this.state.title) {
      this.setState({ errorTitle: 'postTitle' });
    }
  }

  onTagsChange(event) {
    this.setState({ hasEdited: 1 });
    this.setState({ tags: event.target.value });
    if (!this.state.tags) {
      this.setState({ errorTags: 'postTags' });
    }
  }

  onContentChange(event) {
    this.setState({ hasEdited: 1 });
    this.setState({ content: event.target.value });
  }

  onCoverURLChange(event) {
    this.setState({ hasEdited: 1 });
    this.setState({ cover_url: event.target.value });
    if (this.validURL(this.state.cover_url) === false) {
      this.setState({ errorCover: 'errorCover' });
    }
    if (this.validURL(this.state.cover_url) === true) {
      this.setState({ errorCover: 'postCover' });
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

  validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  handleCoverBlur() {
    if (!this.state.cover_url) {
      if (this.validURL(this.state.cover_url) === false) {
        this.setState({ errorCover: 'error_box' });
        console.log('not a real URL');
      }
    }
  }


  handleContentBlur() {
    if (!this.state.content) {
      console.log('no content but that is OK');
    }
  }

  handleSubmit() {
    this.props.history.push('/');
    console.log('trying to submit');
    this.props.createPost({
      title: this.state.title, content: this.state.content, tags: this.state.tags, cover_url: this.state.cover_url,
    }, this.props.history);
  }

  renderCover() {
    if (this.state.errorCover === 'error_box') {
      return (
        <div className="postContent">
          <input className="error_box" placeholder="Image Link" onChange={this.onCoverURLChange} onBlur={this.handleCoverBlur} value={this.state.cover_url} /> <em>Not a valid URL</em>
        </div>
      );
    } else {
      return (
        <div className="postContent">
          <input className="postCover" placeholder="Image Link" onChange={this.onCoverURLChange} onBlur={this.handleCoverBlur} value={this.state.cover_url} />  <em>Optional, but must be a valid URL if entered</em>
        </div>
      );
    }
  }

  renderNewPost() {
    if (this.state.hasEdited === 1 && this.state.hasMoved === 1 && this.state.hasMovedTag === 1 && this.state.errorTitle === 'postTitle' && this.state.errorTags === 'postTags' && this.state.errorCover === 'postCover') {
      return (
        <div>
          <div>
            <input className={this.state.errorTitle} placeholder="Title of Event" onChange={this.onTitleChange} onBlur={this.handleTitleBlur} value={this.state.title} />
          </div>
          <div>
            <input className={this.state.errorTags} placeholder="Location and Time" onChange={this.onTagsChange} onBlur={this.handleTagBlur} value={this.state.tags} />
          </div>
          <div className="postContent">
            <textarea placeholder="Event Description" onChange={this.onContentChange} onBlur={this.handleContentBlur} value={this.state.content} /> <em>Optional</em>
          </div>
          <div>
            {this.renderCover()}
          </div>
          {/* <div>
            <input className="postCover" placeholder="Image Link" onChange={this.onCoverURLChange} onBlur={this.handleCoverBlur} value={this.state.cover_url} />
          </div> */}
          <Link className="link" to="/">
            <button type="button">Cancel</button>
          </Link>
          <button type="button" onClick={this.handleSubmit}>Submit</button>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <input className={this.state.errorTitle} placeholder="Title of Event" onChange={this.onTitleChange} onBlur={this.handleTitleBlur} value={this.state.title} />
          </div>
          <div>
            <input className={this.state.errorTags} placeholder="Location and Time" onChange={this.onTagsChange} onBlur={this.handleTagBlur} value={this.state.tags} />
          </div>
          <div className="postContent">
            <textarea placeholder="Event Description" onChange={this.onContentChange} onBlur={this.handleContentBlur} value={this.state.content} /> <em>Optional</em>
          </div>
          <div>
            {this.renderCover()}
          </div>
          <Link className="link" to="/">
            <button type="button">Cancel</button>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="post">
        <div className="newPostHeader">
        Create a New Free Food Event!
        </div>
        <div>{this.renderNewPost()}</div>
      </div>
    );
  }
}
// export default withRouter(connect(null, { createPost })(Posts));
export default withRouter(connect(null, { createPost })(NewPost));
