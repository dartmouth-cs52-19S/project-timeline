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

  renderPosts() {
    if (this.props.posts) {
      return this.props.posts.map((post) => {
        return (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <div>
              <div>{post.title}</div>
              {/* <div>{post.tags}</div> */}
            </div>
          </Link>
        );
      });
    } else {
      return (<h1>where are my posts?!?!</h1>);
    }
  }

  render() {
    return (
      <div>
        <div>
          These are all the posts
        </div>
        <div>
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
