import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
// import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

// let num = 0;
// function numfunc() {
//   num += 1;
//   $('#main').html(`You've been on this page for ${num} seconds.`);
// }
// setInterval(numfunc, 1000);
const App = () => <div className="test">All the REACT are belong to us!</div>;

ReactDOM.render(<App />, document.getElementById('main'));