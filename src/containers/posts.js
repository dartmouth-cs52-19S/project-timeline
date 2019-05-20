/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
// eslint-disable-next-line max-len
// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchPosts, fetchPost } from '../actions';
import Main from '../components/main';
import Detail from '../components/detail';
// import EventInfo from '../components/timeline';


class Posts extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.displayDetail = this.displayDetail.bind(this);
  // }

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
    console.log({});
  }

  renderDetail() {
    // <Detail
    //   key={post.id}
    //   title={post.title}
    // />;
    console.log('rendering Detail');
  }

  renderMain() {
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
          <div onClick={this.renderDetail}>
            {/* <Link to={`/posts/${post.id}`} key={post.id} className="previewTitle">
              <div className="dot" onClick={this.displayDetail} />
              <div className="timeInfo">
                <h3>{post.title}</h3>
                <h4>{post.tags}</h4>
                {imgTag}
              </div>
            </Link> */}
            <Main
              key={post.id}
              title={post.title}
            />
          </div>
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
        <div className="divider" />
        {/* <div className="allposts">
          {this.renderPosts()}
        </div> */}
        <div className="timelineDisp">
          <div className="placeholderBox">
            {/* {this.renderInfo()} */}
            {/* {this.renderDetail()} */}
          </div>

          <div className="time">
            {this.renderMain()}
          </div>
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
