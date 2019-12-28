import React, { useEffect } from 'react';

const Button = props => {
  //   useEffect(() => {
  //     document.addEventListener('click', props.onClick);

  //     return () => {
  //       document.addEventListener('click', props.onClick);
  //     };
  //   }, []);

  return <div id={props.btnId}>{props.btnText}</div>;
};

export default Button;
