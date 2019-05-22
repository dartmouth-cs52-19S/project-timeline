import React from 'react';

const Banner = (props) => {
  // set the links based on authentication
  const account = (
    <li onClick={() => props.clear()}>Sign Out</li>
  );

  if (props.message === null) {
    return ('');
  } else {
    return (
      <nav className="header">
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
