import { mathInterpreter } from './mathInterpreter';
import { Parser } from './Parser';

export class Calculator {
  private calculator: HTMLElement;
  private output: HTMLOutputElement;
  private errorMsg: HTMLParagraphElement;
  private parser: Parser;

  constructor(selector: string) {
    this.calculator = document.querySelector(selector) as HTMLElement;
    this.output = this.calculator.querySelector('output') as HTMLOutputElement;
    this.errorMsg = this.calculator.querySelector('p') as HTMLParagraphElement;
    this.parser = new Parser();
    // this.clearOutput();
    this.listen();
  }

  listen() {
    this.calculator.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('keydown', this.handleInput.bind(this));
  }

  clearOutput() {
    // TODO: Handle mysterious call to clear after calculating output
    console.log(`I'm being a jerk :)`);
    this.output.textContent = '';
  }

  clearError() {
    this.errorMsg.textContent = '';
  }

  backspace() {
    this.output.textContent = this.output.textContent!.slice(0, -1);
  }

  enterInput(char: string) {
    if (this.output.textContent === '0') {
      this.output.textContent = char;
    } else {
      this.output.textContent = this.handleExponentialOperator(
        this.output.textContent + char,
      );
    }
  }

  calculateOutput() {
    let input = this.handleUnsupportedNegativeIntegers(
      this.output.textContent! + ';',
    );

    if (input === ';' || !input) {
      return;
    }

    try {
      const ast = this.parser.parse(input);
      const result = String(mathInterpreter(ast));
      this.output.textContent = result;
    } catch (error) {
      this.errorMsg.textContent = 'Malformed Expression';
    }
  }

  handleExponentialOperator(input: string) {
    // TODO: update parser to handle double multiplicative symbols
    return input.replace('××', '^');
  }

  handleUnsupportedNegativeIntegers(input: string) {
    // TODO: update parser to handle negative numbers
    return input.startsWith('-') ? `0${input}` : input;
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;

    if (target.tagName !== 'BUTTON') {
      return;
    }

    this.clearError();

    let key: string = target.textContent as string;

    if (key === 'C') {
      return this.clearOutput();
    }

    if (key === '=') {
      return this.calculateOutput();
    }

    this.enterInput(key);
  }

  handleInput({ key }: KeyboardEvent) {
    this.clearError();

    if (key.match(/^[\d+\-\/%√\(\)\.\^]/)) {
      return this.enterInput(key);
    }

    if (key.match(/^[x\*]/)) {
      return this.enterInput('×');
    }

    if (key === 'Enter' || key === '=') {
      return this.calculateOutput();
    }

    if (key === 'Backspace') {
      return this.backspace();
    }

    if (key === 'Escape') {
      return this.clearOutput();
    }
  }
}
