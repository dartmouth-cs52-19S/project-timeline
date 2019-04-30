/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import { fetchPost, updatePost, deletePost } from '../actions';


class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.post.title,
      content: props.post.content,
      tags: props.post.tags,
      cover_url: props.post.cover_url,
      isEditing: 0,
    };
    this.toggleDelete = this.toggleDelete.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onCoverChange = this.onCoverChange.bind(this);
    this.toggleSubmit = this.toggleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.validURL = this.validURL.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
    this.setState({ title: this.props.post.title });
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  onTagChange(event) {
    this.setState({ tags: event.target.value });
  }

  onCoverChange(event) {
    this.setState({ cover_url: event.target.value });
  }

  toggleDelete() {
    this.props.deletePost(this.props.post._id, this.props.history);
  }

  toggleEdit() {
    this.setState({ isEditing: 1 });
  }

  toggleSubmit() {
    this.props.updatePost(this.props.post._id, {
      title: this.state.title, content: this.state.content, tags: this.state.tags, cover_url: this.state.cover_url,
    }, this.props.history);
    this.setState({ isEditing: 0 });
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


  render() {
    if (this.state.isEditing === 1) {
      return (
        <div>
          <span>{this.props.post.title}</span>
          <div>
            <input placeholder={this.props.post.title} onChange={this.onTitleChange} value={this.value} />
            <input placeholder={this.props.post.tags} onChange={this.onTagChange} value={this.value} />
            <textarea placeholder={this.props.post.content} onChange={this.onContentChange} value={this.value} />
            {/* <div> Post ID: {this.props.post._id} </div> */}
            {/* <div> Tags: {this.props.post.tags} </div> */}
            {/* <div> Content: {this.props.post.content} </div> */}
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.post.cover_url || '') }} />
            <button type="button" onClick={this.toggleDelete}>Delete</button>
            <button type="button" onClick={this.toggleEdit}>Edit</button>
            <button type="button" onClick={this.toggleSubmit}>Submit</button>
          </div>
        </div>

      );
    } else if (this.validURL(this.props.post.cover_url) === true) {
      return (
        <div>
          <div>
            <img src={this.props.post.cover_url} alt="image" />
          </div>
          <span>{this.props.post.title}</span>
          <div>
            {/* <div> Post ID: {this.props.post._id} </div> */}
            <div> Tags: {this.props.post.tags} </div>
            {/* <div> Content: {this.props.post.content} </div> */}
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
            <button type="button" onClick={this.toggleDelete}>Delete</button>
            <button type="button" onClick={this.toggleEdit}>Edit</button>
            <button type="button" onClick={this.toggleSubmit}>Submit</button>
          </div>
        </div>

      );
    } else {
      return (
        <div>
          {/* <div>
            <img src={this.props.post.cover_url} alt="image" />
          </div> */}
          <span>{this.props.post.title}</span>
          <div>
            {/* <div> Post ID: {this.props.post._id} </div> */}
            <div> Tags: {this.props.post.tags} </div>
            {/* <div> Content: {this.props.post.content} </div> */}
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
            <button type="button" onClick={this.toggleDelete}>Delete</button>
            <button type="button" onClick={this.toggleEdit}>Edit</button>
            <button type="button" onClick={this.toggleSubmit}>Submit</button>
          </div>
        </div>

      );
    }
  }
}

// // connects particular parts of redux state to this components props

const mapStateToProps = state => (
  {
    post: state.posts.post,
  }
);

// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default withRouter(connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post));
// export default withRouter(connect(mapStateToProps, null)(Post));
