import React from 'react';

const Detail = (props) => {
  return (
    <div>
      {props.title}
      <br />
      <br />
      {props.content}
    </div>
  );
};

export default Detail;
