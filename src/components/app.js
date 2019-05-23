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
import UpdateTimeline from '../containers/update-timeline';
import Settings from '../containers/settings';
import UserProfile from '../containers/user';
import Landing from '../containers/landing';

// import RequireAuth from '../containers/requireAuth';

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Banner />
        <Switch>
          <Route exact path="/" component={Landing} />

          <Route path="/explore/start" component={Timeline} />
          <Route path="/explore/:timelineID" component={Timeline} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/newTime" component={CreateTimeline} />
          <Route path="/updateTime" component={UpdateTimeline} />
          <Route path="/settings" component={Settings} />
          <Route path="/personal" component={UserProfile} />

          <Route render={() => (<div> This life does not exist </div>)} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
