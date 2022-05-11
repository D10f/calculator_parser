import { Token, TokenizerSpec } from './types';

const Spec: TokenizerSpec = [
  // numbers
  [/^\d+/, 'NUMBER'],

  // double quotes
  [/^"[^"]*"/, 'STRING'],

  // single quotes
  [/^'[^']*'/, 'STRING'],

  // whitespaces
  [/^\s+/, 'SKIP'],

  // single-line comments
  [/^\/\/.*/, 'SKIP'],

  // multi-line comments
  [/^\/\*[\s\S]*\*\//, 'SKIP'],

  // expression delimiters
  [/^;/, ';'],

  // symbols
  [/^\(/, '('],
  [/^\)/, ')'],

  // math operators
  [/^[+\-]/, 'ADDITIVE_OPERATOR'],
  [/^[\*\/]/, 'MULTIPLICATIVE_OPERATOR'],
];

/**
 * Lazily pulls a token from a stream
 */
export class Tokenizer {
  constructor(private str: string = '', private cursor: number = 0) {}

  /**
   * Whether there are tokens left in the string
   */
  private hasMoreTokens() {
    return this.cursor < this.str.length;
  }

  /**
   * Matches a token against a regular expression
   */
  private match(regexp: RegExp, str: string) {
    const match = regexp.exec(str);
    if (match === null) {
      return null;
    }
    this.cursor += match[0].length;
    return match[0];
  }

  /**
   * Obtains next token
   */
  getNextToken(): Token | null {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this.str.slice(this.cursor);

    for (const [regexp, type] of Spec) {
      const value = this.match(regexp, string);

      // no match for current rule, move on to next one
      if (value === null) {
        continue;
      }

      // rule should be ignored eg. whitespaces
      if (type === 'SKIP') {
        return this.getNextToken();
      }

      return { type, value };
    }

    throw new SyntaxError(`Unexpected token: "${string[0]}"`);
  }
}
