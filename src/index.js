<<<<<<< HEAD
/* eslint-disable react/jsx-filename-extension */


// change require to es6 import style
// import $ from 'jquery';
=======
import React from 'react';
import ReactDOM from 'react-dom';
>>>>>>> 4dd1a2daf1225afbae31c05427e7d0f4a859892f
import './style.scss';
// import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

// let num = 0;
// function numfunc() {
//   num += 1;
//   $('#main').html(`You've been on this page for ${num} seconds.`);
// }
// setInterval(numfunc, 1000);
const App = () => <div className="test">All the REACT are belong to us!</div>;

ReactDOM.render(<App />, document.getElementById('main'));


// const About = (props) => {
//   return <div> All there is to know about me </div>;
// };
// const Welcome = (props) => {
//   return <div>Welcome</div>;
// };


// const Nav = (props) => {
//   return (
//     <nav>
//       <ul>
//         <li><NavLink to="/">Home</NavLink></li>
//         <li><NavLink to="/about">About</NavLink></li>
//       </ul>
//     </nav>
//   );
// };


<<<<<<< HEAD
// const App = (props) => {
//   return (
//     <Router>
//       <div>
//         <Nav />
//         <Route exact path="/" component={Welcome} />
//         <Route path="/about" component={About} />
//       </div>
//     </Router>
//   );
// };
=======
const App = () => <div className="test">All the REACT are belong to us!</div>;

ReactDOM.render(<App />, document.getElementById('main'));
>>>>>>> 4dd1a2daf1225afbae31c05427e7d0f4a859892f
