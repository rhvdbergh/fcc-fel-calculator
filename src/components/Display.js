import React from 'react';

const Display = props => {
  return <div id={props.displayId}>{props.calcState}</div>;
};

export default Display;
