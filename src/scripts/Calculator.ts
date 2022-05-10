enum Operation {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  ROOT,
  MODULO,
  IDLE,
}

/**
 * @example valid: 3.2 * (15 - 4.13)
 * @example valid: -32 - 42
 * @example valid: 2 + 2 - (3.14 * -27) + 0.32
 * @example invalid: -(32 - 42)
 * @example invalid: 3.14 + .2
 */
const calcRegexp =
  // /^-?(?=\d)(\(?\d+(\.\d*)?\)?)([\+\-\*\\](\(?-?(?=\d)\d+(\.\d*)?\)?))+/;
  /^-?(?=\d)(\(?\d+(\.\d*)?\)?)(([\+\-\*\\](\(?-?(?=\d)\d+(\.\d*)?\)?))+)?/;

export class Calculator {
  private operation: Operation;
  private input: string;
  private history: string;
  private validInput: RegExp;
  private calculator: HTMLElement;
  private inputDOM: HTMLElement;

  constructor(private calculatorDOM: string) {
    this.operation = Operation.IDLE;
    this.input = '0';
    this.history = '';
    this.validInput = new RegExp(calcRegexp);
    this.calculator = document.querySelector(calculatorDOM) as HTMLElement;
    this.inputDOM = this.calculator.querySelector('section div') as HTMLElement;
    this.reset();
    this.listen();
  }

  listen() {
    this.calculator.addEventListener('click', this.handleClick.bind(this));
    // this.calculator.addEventListener('input', this.handleInput);
  }

  reset() {
    this.operation = Operation.IDLE;
    this.input = '0';
    this.history = '';
    this.updateScreen(this.input);
  }

  setOperation(operation: Operation) {
    this.operation = operation;
  }

  validateInput(newInput: string) {
    return this.validInput.test(newInput);
  }

  calculateOutput() {
    const operands = this.input.split('');
  }

  updateScreen(char: string) {
    const newInput = this.input.startsWith('0') ? char : (this.input += char);
    const isValid = this.validateInput(newInput);

    if (isValid) {
      this.input = newInput;
      this.inputDOM.textContent = this.input;
    }
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.tagName !== 'BUTTON') {
      return;
    }

    let key: string = target.textContent as string;

    switch (key.charCodeAt(0)) {
      case 43: // +
        this.setOperation(Operation.ADD);
        break;
      case 45: // -
        this.setOperation(Operation.SUBTRACT);
        break;
      case 215: // x or &times;
        this.setOperation(Operation.MULTIPLY);
        key = '*';
        break;
      case 47: // /
        this.setOperation(Operation.DIVIDE);
        break;
      case 37: // %
        this.setOperation(Operation.MODULO);
        break;
      case 61: // =
        return this.calculateOutput();
      case 67: // C
        this.reset();
        break;
    }

    this.updateScreen(key);
  }
}
