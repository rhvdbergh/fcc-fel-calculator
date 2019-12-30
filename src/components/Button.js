import React, { useEffect } from 'react';

const Button = props => {
  const onClick = evt => {
    document.getElementById(props.btnId).classList.add('pressed');
    setTimeout(() => {
      document.getElementById(props.btnId).classList.remove('pressed');
    }, 250);
  };

  useEffect(() => {
    document.getElementById(props.btnId).addEventListener('click', onClick);

    return () => {
      document.getElementById(props.btnId).addEventListener('click', onClick);
    };
  }, []);

  return (
    <div id={props.btnId} className={props.btnClass}>
      {props.btnText}
    </div>
  );
};

export default Button;
