/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchPosts, fetchPost } from '../actions';


class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  componentDidMount() {
    this.props.fetchPosts();
    console.log(this.props.fetchPosts);
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

  renderPosts() {
    if (this.props.posts) {
      return this.props.posts.map((post) => {
        if (this.validURL(post.cover_url) === true) {
          return (
            <Link to={`/posts/${post.id}`} key={post.id} className="previewTitle">
              <div className="preview">
                <div className="previewTitleText">{post.title}</div>
                <div className="previewTagsText">{post.tags}</div>
                <img src={post.cover_url} alt="post" className="previewImage" />
              </div>
            </Link>
          );
        } else {
          return (
            <Link to={`/posts/${post.id}`} key={post.id} className="previewTitle">
              <div className="preview">
                <div>{post.title}</div>
              </div>
            </Link>
          );
        }
      });
    } else {
      return (<h1>No Free Food Events!</h1>);
    }
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
