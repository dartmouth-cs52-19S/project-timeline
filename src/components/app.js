import React from 'react';
import '../style.scss';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
// import Counter from '../containers/counter';
// import Controls from '../containers/controls';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NewPost from '../containers/new-post';


// const About = (props) => {
//   return <div> All there is to know about me </div>;
// };
// const Welcome = (props) => {
//   return (
//     <div>
//       <div><Counter /></div>
//       <div><Controls /></div>
//       Welcome
//     </div>
//   );
// };
// const Test = (props) => {
//   return <div> ID: {props.match.params.id} </div>;
// };
// const FallBack = (props) => {
//   return <div>URL Not Found</div>;
// };

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/posts/new">new post</NavLink></li>
        {/* <li><NavLink to="/" exact>Home</NavLink></li> */}
        {/* <li><NavLink to="/about">About</NavLink></li> */}
        {/* <li><NavLink to="/test/id1">Test Post 1</NavLink></li>
        <li><NavLink to="/test/id2">Test Post 2</NavLink></li> */}
        {/* <li><NavLink to="/posts/postID1">Test Post 1</NavLink></li> */}
        {/* <li><NavLink to="/posts/postID2">Test Post 2</NavLink></li> */}
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
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
