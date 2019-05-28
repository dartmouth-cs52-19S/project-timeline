/* eslint-disable new-cap */
import React from 'react';
import '../style.scss';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
// import TimeMain from '../containers/time-main';
import Timeline from '../containers/timeline';
import Nav from '../containers/nav';
import Banner from '../containers/banner';
import SignIn from '../containers/signin';
import SignUp from '../containers/signup';
import CreateTimeline from '../containers/create-timeline';
import SaveTimeline from '../containers/saveTimeline';
import UpdateTimeline from '../containers/update-timeline';
import Settings from '../containers/settings';
import UserProfile from '../containers/user';
import Landing from '../containers/landing';

import RequireAuth from '../containers/requireAuth';
import RequireAdmin from '../containers/requireAdmin';

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Banner />
        <Switch>
          <Route exact path="/" component={Landing} />

          <Route path="/explore/start" component={RequireAuth(Timeline)} />
          <Route path="/explore/:timelineID" component={RequireAuth(Timeline)} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/newTime" component={RequireAdmin(CreateTimeline)} />
          <Route path="/updateTime" component={RequireAdmin(UpdateTimeline)} />
          <Route path="/settings" component={RequireAuth(Settings)} />
          <Route path="/personal" component={RequireAuth(UserProfile)} />
          <Route path="/save" component={RequireAuth(SaveTimeline)} />
          <Route render={() => (<div> This life does not exist </div>)} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
