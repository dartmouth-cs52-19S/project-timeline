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

    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.submit = this.submit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.validURL = this.validURL.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
    this.setState({ title: this.props.post.title });
  }

  edit(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  delete() {
    this.props.deletePost(this.props.post._id, this.props.history);
  }

  startEdit() {
    this.setState({
      isEditing: 1,
      title: this.props.post.title,
      tags: this.props.post.tags,
      cover_url: this.props.post.cover_url,
      content: this.props.post.content,
    });
  }

  submit() {
    this.props.updatePost(this.props.post._id, {
      title: this.state.title,
      content: this.state.content,
      tags: this.state.tags,
      cover_url: this.state.cover_url,
    }, this.props.history);

    this.setState({ isEditing: 0 });
  }

  // Adapted rom https://stackoverflow.com/questions/13373504/what-is-a-valid-url-query-string
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
    // editing view
    if (this.state.isEditing === 1) {
      return (
        <div className="post">
          <div>
            <p>Posted by: {this.props.post.username}</p>
            <div>
              <input
                className="postTitle"
                name="title"
                placeholder={this.props.post.title}
                onChange={this.edit}
                value={this.state.title}
              />
              <em>Title</em>
            </div>
            <div>
              <input className="postTags"
                name="tags"
                placeholder={this.props.post.tags}
                onChange={this.edit}
                value={this.state.tags}
              />
              <em>Location and Time</em>
            </div>
            <div className="postContent">
              <textarea
                name="content"
                placeholder={this.props.post.content}
                onChange={this.edit}
                value={this.state.content}
              />
              <em>Description</em>
            </div>
            <div>
              <input
                name="cover_url"
                className="postCover"
                placeholder={this.props.post.cover_url}
                onChange={this.edit}
                value={this.state.cover_url}
              />
              <em>Image URL</em>
            </div>
            <button type="button" onClick={this.delete}>Delete Event</button>
            {/* <button type="button" onClick={this.toggleEdit}>Edit</button> */}
            <button type="button" onClick={this.submit}>Save Changes</button>
          </div>
        </div>

      );
    } else if (this.validURL(this.props.post.cover_url) === true) { // check url
      return (
        <div className="post">
          <p>Posted by: {this.props.post.username}</p>
          <div className="postTitle">
            {this.props.post.title}
          </div>
          <div>
            {/* <div> Post ID: {this.props.post._id} </div> */}
            <div className="postTags">{this.props.post.tags} </div>
            <div className="postImage">
              <img className="postImagedisp" src={this.props.post.cover_url} alt="image" />
            </div>
            {/* <div> Content: {this.props.post.content} </div> */}
            <div
              className="noteBody"
              dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }}
            />
            <button type="button" onClick={this.delete}>Delete Event</button>
            <button type="button" onClick={this.startEdit}>Edit Event</button>
            {/* <button type="button" onClick={this.submit}>Submit</button> */}
          </div>
        </div>

      );
    } else { // normal presentation
      return (
        <div className="post">
          <p>Posted by: {this.props.post.username}</p>
          <div className="postTitle">
            {this.props.post.title}
          </div>
          <div>
            {/* <div> Post ID: {this.props.post._id} </div> */}
            <div className="postTags"> Location and Time: {this.props.post.tags} </div>
            {/* <div> Content: {this.props.post.content} </div> */}
            <div
              className="noteBody"
              dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }}
            />
            <button type="button" onClick={this.delete}>Delete Event</button>
            <button type="button" onClick={this.startEdit}>Edit Event</button>
            {/* <button type="button" onClick={this.submit}>Submit</button> */}
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
