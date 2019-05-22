import React from 'react';

const Banner = (props) => {
  // set the links based on authentication
  const account = (
    <li onClick={() => props.clear()}><i className="fas fa-times grow" /></li>
  );

  if (props.message === null) {
    return ('');
  } else {
    return (
      <nav className="header" id="banner">
        <div>
          <p>
            {props.message}
          </p>
        </div>
        <div>
          <ul>
            {account}
          </ul>
        </div>
      </nav>
    );
  }
};

export default Banner;
