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
  }


  onTitleChange(event) {
    this.setState({ title: event.target.value });
    console.log(this.state.title);
    console.log(this.props.state);
  }

  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }

  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  onCoverURLChange(event) {
    this.setState({ cover_url: event.target.value });
    if (this.validURL(this.state.cover_url) === false) {
      console.log('not a real URL');
    }
  }

  handleTitleBlur() {
    if (!this.state.title) {
      console.log('no title');
    }
  }

  handleTagBlur() {
    if (!this.state.tags) {
      console.log('no tags');
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
      console.log('no cover');
    }
  }

  handleContentBlur() {
    if (!this.state.content) {
      console.log('no content');
    }
  }

  handleSubmit() {
    this.props.history.push('/');
    console.log('trying to submit');
    this.props.createPost({
      title: this.state.title, content: this.state.content, tags: this.state.tags, cover_url: this.state.cover_url,
    }, this.props.history);
  }

  renderNewPost() {
    return (
      <div>
        <h1>Create a New Post</h1>
        <input placeholder="title" onChange={this.onTitleChange} onBlur={this.handleTitleBlur} value={this.state.title} />
        <input placeholder="tags" onChange={this.onTagsChange} onBlur={this.handleTagBlur} value={this.state.tags} />
        <input placeholder="content" onChange={this.onContentChange} onBlur={this.handleContentBlur} value={this.state.content} />
        <input placeholder="cover_url" onChange={this.onCoverURLChange} onBlur={this.handleCoverBlur} value={this.state.cover_url} />
        <button type="button" onClick={this.handleSubmit}>Submit</button>
        <Link className="link" to="/">
          <div>
            <button type="button">Cancel</button>
          </div>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div>{this.renderNewPost()}</div>
    );
  }
}
// export default withRouter(connect(null, { createPost })(Posts));
export default withRouter(connect(null, { createPost })(NewPost));
