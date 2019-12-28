import React from 'react';

import Button from './Button';
import Display from './Display';

const Calculator = () => {
  return (
    <div id="calc_container">
      <Button btnId="equals" btnText="=" />
      <Button btnId="zero" btnText="0" />
      <Button btnId="one" btnText="1" />
      <Button btnId="two" btnText="2" />
      <Button btnId="three" btnText="3" />
      <Button btnId="four" btnText="4" />
      <Button btnId="five" btnText="5" />
      <Button btnId="six" btnText="6" />
      <Button btnId="seven" btnText="7" />
      <Button btnId="eight" btnText="8" />
      <Button btnId="nine" btnText="9" />
      <Button btnId="add" btnText="+" />
      <Button btnId="subtract" btnText="-" />
      <Button btnId="multiply" btnText="*" />
      <Button btnId="divide" btnText="/" />
      <Button btnId="decimal" btnText="." />
      <Button btnId="clear" btnText="C" />
      <Display />
    </div>
  );
};

export default Calculator;
