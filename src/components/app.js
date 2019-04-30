import React from 'react';
import '../style.scss';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NewPost from '../containers/new-post';


// const About = (props) => {
//   return <div> All there is to know about me </div>;
// };

const Nav = (props) => {
  return (
    <nav className="header">
      <ul>
        <li><NavLink exact to="/" className="link">Home</NavLink></li>
        <li><NavLink to="/posts/new" className="link">New Free Food Event</NavLink></li>
        {/* <li><NavLink to="/about">About</NavLink></li> */}
      </ul>
    </nav>
  );
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          {/* <Route path="/about" component={About} /> */}
          <Route exact path="/posts/:postID" component={Post} />
          <Route render={() => (<div>Food Hack not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
