/* eslint-disable new-cap */
import React from 'react';
import '../style.scss';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
// import TimeMain from '../containers/time-main';
import Timeline from '../containers/timeline';
// import Posts from '../containers/posts';
import Post from '../containers/post';
import NewPost from '../containers/new-post';
import Nav from '../containers/nav';
import SignIn from '../containers/signin';
import SignUp from '../containers/signup';
import RequireAuth from '../containers/requireAuth';

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Timeline} />
          {/* <Route exact path="/" component={Posts} /> */}
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/posts/new" component={RequireAuth(NewPost)} />
          <Route exact path="/posts/:postID" component={Post} />
          <Route render={() => (<div>Food Hack not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
