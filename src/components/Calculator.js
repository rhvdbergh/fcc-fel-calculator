import React, { useState, useEffect } from 'react';

import Button from './Button';
import Display from './Display';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { display: '0', total: 0, operator: null };
    this.initialState = this.state; // in case of reset by pressing 'C'

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.update = this.update.bind(this);
  }

  update(btnPressed) {
    let newDisplay = this.state.display;
    let newTotal = this.state.total;
    let newOperator = this.state.operator;

    // pressing C will reset to the initial state
    if (btnPressed.toUpperCase() === 'C') {
      this.setState(this.initialState);
      return;
    }

    // if an operand was previously selected, perform
    if (this.state.operator && !'+-*/'.includes(btnPressed)) {
      console.log('previously you selected an operand');
    }

    if ('1234567890.'.includes(btnPressed)) {
      if (this.state.display === '0') {
        newDisplay = btnPressed;
      } else {
        newDisplay = this.state.display + btnPressed;
      }
      // set the new total to the same as the display
      newTotal = parseFloat(newDisplay);
    }

    if ('+-*/'.includes(btnPressed)) {
      newOperator = btnPressed;
      console.log("you've got a function");
    }

    this.setState({
      display: newDisplay,
      total: newTotal,
      operator: newOperator
    });

    console.log(this.state);
  }

  handleKeyPress(evt) {
    this.update(evt.key);
  }

  handleClick(evt) {
    this.update(evt.target.innerHTML);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
    document.addEventListener('click', this.handleClick, false);
  }

  render() {
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
        <Display calcState={this.state.display} />
      </div>
    );
  }
}

export default Calculator;
