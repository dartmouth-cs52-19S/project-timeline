/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
// eslint-disable-next-line max-len
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchPosts, fetchPost } from '../actions';


class Posts extends Component {
  constructor(props) {
    super(props);
    this.displayDetail = this.displayDetail.bind(this);
  }

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

  displayDetail() {
    console.log('diplaying detail');
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
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="{post.tags}"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon="clickable icon?"
            iconOnClick={this.displayDetail}
          >
            <h3 className="vertical-timeline-element-title">{post.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">{post.tags}</h4>
            {imgTag}
          </VerticalTimelineElement>
          // <Link to={`/posts/${post.id}`} key={post.id} className="previewTitle">
          //   <div className="preview">
          //     <div className="previewTitleText">{post.title}</div>
          //     <div className="previewTagsText">{post.tags}</div>
          //     {imgTag}
          //   </div>
          // </Link>
          // <VerticalTimelineElement>
          //   className="vertical-timeline-element--work"
          //   date="2011 - present"
          // </VerticalTimelineElement>
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
        {/* <div className="allposts">
          {this.renderPosts()}
        </div> */}
        <div className="timelineDisp">
          <div className="placeholderBox">
          Hello
          </div>
          <VerticalTimeline>
            {this.renderPosts()}
          </VerticalTimeline>
        </div>
        {/* <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2011 - present"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            // icon={}
          >
            <h3 className="vertical-timeline-element-title">Creative Director</h3>
            <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
            <p>
      Creative Direction, User Experience, Visual Design, Project Management, Team Leading
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline> */}
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
