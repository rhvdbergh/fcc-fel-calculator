import React from 'react';

import Button from './Button';
import Display from './Display';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: '0',
      displayEquation: '0',
      total: 0,
      operator: null
    };
    this.initialState = this.state; // in case of reset by pressing 'C'

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.calculate = this.calculate.bind(this);
    this.update = this.update.bind(this);
  }

  calculate(str) {
    let newStr = str;
    return eval(newStr);
  }

  update(btnPressed) {
    let newDisplay = this.state.display;
    let newDisplayEquation = this.state.displayEquation;
    let newTotal = this.state.total;
    let newOperator = this.state.operator;

    // pressing C will reset to the initial state
    if (btnPressed.toUpperCase() === 'C') {
      this.setState(this.initialState);
      return;
    }

    if ('1234567890'.includes(btnPressed)) {
      // clear the display from operators
      if ('+-*/'.includes(newDisplay)) {
        newDisplay = '';
      }

      if (this.state.display === '0') {
        newDisplay = btnPressed;
        // test if this was the first button pressed
        if (this.state.displayEquation === '0') {
          newDisplayEquation = btnPressed;
        }
      } else {
        newDisplayEquation += btnPressed;
        newDisplay += btnPressed;
      }
      // set the new total to the same as the display
      newTotal = parseFloat(newDisplayEquation);
    }

    if (btnPressed === '.' && !newDisplay.includes('.')) {
      if (!'+-*/'.includes(newDisplay[newDisplay.length - 1])) {
        newDisplayEquation += btnPressed;
        newDisplay += btnPressed;
      } else {
        newDisplayEquation += '0' + btnPressed;
        newDisplay = '0' + btnPressed;
      }
    }

    if ('+*/'.includes(btnPressed)) {
      // if previous entry was an operator (except for -), replace operator
      if ('+-*/'.includes(newDisplayEquation[newDisplayEquation.length - 1])) {
        // newDisplayEquat1+ion[newDisplayEquation.length - 1] = btnPressed;
        let arr = newDisplayEquation.split('');
        arr.pop();
        arr.push(btnPressed);
        newDisplayEquation = arr.join('');
        newDisplay = btnPressed;
        if (
          '+-*/'.includes(newDisplayEquation[newDisplayEquation.length - 2])
        ) {
          let arr = newDisplayEquation.split('');
          arr.pop();
          arr.pop();
          arr.push(btnPressed);
          newDisplayEquation = arr.join('');
          newDisplay = btnPressed;
        }
      } else {
        newDisplayEquation += btnPressed;
        newDisplay = btnPressed;
      }
    }

    if (btnPressed === '-') {
      if (!(newDisplayEquation[newDisplayEquation.length - 2] === '-')) {
        newDisplayEquation += btnPressed;
        newDisplay = btnPressed;
      }
    }

    if (btnPressed === '=') {
      newDisplay = this.calculate(newDisplayEquation);
      newDisplayEquation = newDisplay;
    }

    this.setState({
      display: newDisplay,
      displayEquation: newDisplayEquation,
      total: newTotal,
      operator: newOperator
    });
  }

  handleKeyPress(evt) {
    console.log(evt);

    const buttons = {
      '1': 'one',
      '2': 'two',
      '3': 'three',
      '4': 'four',
      '5': 'five',
      '6': 'six',
      '7': 'seven',
      '8': 'eight',
      '9': 'nine',
      '0': 'zero',
      '=': 'equals',
      '+': 'add',
      '-': 'subtract',
      '*': 'multiply',
      '/': 'divide',
      '.': 'decimal',
      C: 'clear'
    };

    const btn = document.getElementById(buttons[evt.key.toUpperCase()]);

    btn.classList.add('pressed');
    setTimeout(() => {
      btn.classList.remove('pressed');
    }, 250);

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
        <Display
          displayId="display_equation"
          calcState={this.state.displayEquation}
        />
        <Display displayId="display" calcState={this.state.display} />
        <Button btnId="equals" btnClass="operator" btnText="=" />
        <Button btnId="zero" btnClass="number" btnText="0" />
        <Button btnId="one" btnClass="number" btnText="1" />
        <Button btnId="two" btnClass="number" btnText="2" />
        <Button btnId="three" btnClass="number" btnText="3" />
        <Button btnId="four" btnClass="number" btnText="4" />
        <Button btnId="five" btnClass="number" btnText="5" />
        <Button btnId="six" btnClass="number" btnText="6" />
        <Button btnId="seven" btnClass="number" btnText="7" />
        <Button btnId="eight" btnClass="number" btnText="8" />
        <Button btnId="nine" btnClass="number" btnText="9" />
        <Button btnId="add" btnClass="operator" btnText="+" />
        <Button btnId="subtract" btnClass="operator" btnText="-" />
        <Button btnId="multiply" btnClass="operator" btnText="*" />
        <Button btnId="divide" btnClass="operator" btnText="/" />
        <Button btnId="decimal" btnClass="operator" btnText="." />
        <Button btnId="clear" btnClass="number" btnText="C" />
      </div>
    );
  }
}

export default Calculator;
