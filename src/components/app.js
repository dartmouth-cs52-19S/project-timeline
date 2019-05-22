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
// import RequireAuth from '../containers/requireAuth';

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Banner />
        <Switch>
          <Route exact path="/" component={Timeline} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/newTime" component={CreateTimeline} />
          <Route path="/updateTime" component={UpdateTimeline} />
          <Route path="/settings" component={Settings} />
          <Route path="/personal" component={UserProfile} />
          <Route path="/save" component={SaveTimeline} />
          <Route path="/:timelineID" component={Timeline} />
          <Route render={() => (<div>Food Hack not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
