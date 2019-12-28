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
    // let regex = new RegExp(/[\+\-\*\/][\+\-\*\/][\+\-\*\/]/, 'g');
    console.log(str);
    // console.log('regex test', regex.test(newStr));
    // let newStr = str.replace('--', '- -');
    // newStr = newStr.replace('-+', '- +');
    // newStr = newStr.replace('-*', '- *');
    // newStr = newStr.replace('-/', '- /');

    return eval(newStr);
  }

  update(btnPressed) {
    console.log('button:', btnPressed);
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
      </div>
    );
  }
}

export default Calculator;
