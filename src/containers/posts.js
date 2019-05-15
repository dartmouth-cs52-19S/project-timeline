/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchPosts, fetchPost } from '../actions';


class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    console.log(this.props.fetchPosts);
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

  renderPosts() {
    // if no posts return message
    if (!this.props.posts) {
      return (<h1>No Free Food Events!</h1>);
    }
    // otherwise return post previews
    return (
      this.props.posts.map((post) => {
        // if img url define img tag to include
        const imgTag = this.validURL(post.cover_url)
          ? (<img src={post.cover_url} alt="post" className="previewImage" />) : '';

        // return post preview
        return (
          <Link to={`/posts/${post.id}`} key={post.id} className="previewTitle">
            <div className="preview">
              <div className="previewTitleText">{post.title}</div>
              <div className="previewTagsText">{post.tags}</div>
              {imgTag}
            </div>
          </Link>
        );
      })
    );
  }

  render() {
    return (
      <div>
        <div className="foodHeader">
          <span><em>{this.props.posts.length}</em>   Free Food Events at <b>Dartmouth</b> </span>
        </div>
        <div className="foodHeaderSecondary">
          <h4>Low on DBA or Meal Swipes? Find tasty, free food near you!</h4>
        </div>
        {/* <div className="divider" /> */}
        <div className="allposts">
          {this.renderPosts()}
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts.all,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchPost })(Posts));
