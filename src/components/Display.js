import React from 'react';

const Display = props => {
  return (
    <div id={props.displayId}>
      <p className="display_text">{props.calcState}</p>
    </div>
  );
};

export default Display;
