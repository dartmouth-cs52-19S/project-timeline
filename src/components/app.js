/* eslint-disable new-cap */
import React from 'react';
import '../style.scss';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NewPost from '../containers/new-post';
import Nav from '../containers/nav';
import SignIn from '../containers/signin';
import SignUp from '../containers/signup';
import RequireAuth from '../containers/requireAuth';

// const About = (props) => {
//   return <div> All there is to know about me </div>;
// };

// const Nav = (props) => {
//   return (
//     <nav className="header">
//       <ul>
//         <li><NavLink exact to="/" className="link">Home</NavLink></li>
//         <li><NavLink to="/posts/new" className="link">New Free Food Event</NavLink></li>
//         {/* <li><NavLink to="/about">About</NavLink></li> */}
//       </ul>
//     </nav>
//   );
// };

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/posts/new" component={RequireAuth(NewPost)} />
          {/* <Route path="/about" component={About} /> */}
          <Route exact path="/posts/:postID" component={Post} />
          <Route render={() => (<div>Food Hack not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
