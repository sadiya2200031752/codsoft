let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');

let calculator = {
  displayValue: '0',
  firstOperand: '',
  secondOperand: '',
  operator: '',

  init: function() {
    buttons.forEach(button => {
      button.addEventListener('click', this.handleButtonPress.bind(this));
    });
  },

  handleButtonPress: function(event) {
    let buttonValue = event.target.textContent;

    switch (buttonValue) {
      case 'C':
        this.clear();
        break;
      case '←':
        this.backspace();
        break;
      case '=':
        this.calculate();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.setOperator(buttonValue);
        break;
      default:
        this.appendNumber(buttonValue);
    }

    display.value = this.displayValue;
  },

  clear: function() {
    this.displayValue = '0';
    this.firstOperand = '';
    this.secondOperand = '';
    this.operator = '';
  },

  backspace: function() {
    this.displayValue = this.displayValue.slice(0, -1);
    if (this.displayValue === '') {
      this.displayValue = '0';
    }
  },

  setOperator: function(operator) {
    this.operator = operator;
    this.firstOperand = this.displayValue;
    this.displayValue = '0';
  },

  appendNumber: function(number) {
    if (this.displayValue === '0') {
      this.displayValue = number;
    } else {
      this.displayValue += number;
    }
  },

  calculate: function() {
    this.secondOperand = this.displayValue;
    let result = 0;

    switch (this.operator) {
      case '+':
        result = parseFloat(this.firstOperand) + parseFloat(this.secondOperand);
        break;
      case '-':
        result = parseFloat(this.firstOperand) - parseFloat(this.secondOperand);
        break;
      case '*':
        result = parseFloat(this.firstOperand) * parseFloat(this.secondOperand);
        break;
      case '/':
        result = parseFloat(this.firstOperand) / parseFloat(this.secondOperand);
        break;
    }

    this.displayValue = result.toString();
    this.firstOperand = '';
    this.secondOperand = '';
    this.operator = '';
  }
};

calculator.init();