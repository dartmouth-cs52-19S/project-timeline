import React from 'react';
import '../style.scss';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
// import TimeMain from '../containers/time-main';
import TimelineExplore from '../containers/explore-view';
import Nav from '../containers/nav';
import SignIn from '../containers/signin';
import SignUp from '../containers/signup';
import CreateTimeline from '../containers/create-timeline';
import Settings from '../containers/settings';
// import RequireAuth from '../containers/requireAuth';

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={TimelineExplore} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/newTime" component={CreateTimeline} />
          <Route path="/settings" component={Settings} />

          {/* UNCOMMENT WHEN WE HAVE USER SAVING FUNCTIONALITY */}
          {/* <Route path="/personal" component={Timeline} /> */}
          <Route render={() => (<div>Food Hack not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
