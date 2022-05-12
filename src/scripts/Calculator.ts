import { mathInterpreter } from './mathInterpreter';
import { Parser } from './Parser';

export class Calculator {
  private calculator: HTMLElement;
  private output: HTMLOutputElement;
  private parser: Parser;

  constructor(selector: string) {
    this.calculator = document.querySelector(selector) as HTMLElement;
    this.output = this.calculator.querySelector('output') as HTMLOutputElement;
    this.parser = new Parser();
    this.clear();
    this.listen();
  }

  listen() {
    this.calculator.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('keydown', this.handleInput.bind(this));
  }

  clear() {
    console.log(`I'm being a jerk :)`);
    this.output.textContent = '';
  }

  backspace() {
    this.output.textContent = this.output.textContent!.slice(0, -1);
  }

  enterInput(char: string) {
    if (this.output.textContent === '0') {
      this.output.textContent = char;
    } else {
      this.output.textContent += char;
    }
  }

  calculateOutput() {
    let input = this.output.textContent! + ';';

    // TODO: update parser to handle negative numbers
    if (input.startsWith('-')) {
      input = '0' + input;
    }

    const ast = this.parser.parse(input);
    const result = String(mathInterpreter(ast));
    this.output.textContent = result;
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;

    if (target.tagName !== 'BUTTON') {
      return;
    }

    let key: string = target.textContent as string;

    if (key === 'C') {
      return this.clear();
    }

    if (key === '=') {
      return this.calculateOutput();
    }

    this.enterInput(key);
  }

  handleInput({ key }: KeyboardEvent) {
    if (key.match(/^[\d+\-\/%√\(\)\.]/)) {
      return this.enterInput(key);
    }

    if (key.match(/^[x\*]/)) {
      return this.enterInput('×');
    }

    if (key.match(/^[Enter|=]/)) {
      return this.calculateOutput();
    }

    if (key === 'Backspace') {
      this.backspace();
    }
  }
}
