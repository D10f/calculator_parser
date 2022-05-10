import { isNumber } from './utils';
import { TOKEN_TYPE, Token } from './types';

/**
 * Lazily pulls a token from a stream
 */
export class Tokenizer {
  constructor(private str: string = '', private cursor: number = 0) {}

  init(str: string) {
    this.str = str;
  }

  /**
   * Whether there are tokens left in the string
   */
  hasMoreTokens() {
    return this.cursor < this.str.length;
  }

  /**
   * Whether the tokenizer has reached the end of the file
   */
  isEOF() {
    return this.cursor === this.str.length;
  }

  /**
   * Obtains next token
   */
  getNextToken(): Token | null {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this.str.slice(this.cursor);

    // Numbers
    if (isNumber(string[0])) {
      let value = '';

      while (isNumber(string[this.cursor])) {
        value += string[this.cursor++];
      }

      return {
        type: TOKEN_TYPE.NUMBER,
        value,
      };
    }

    // Strings
    if (string[0] === '"' || string[0] === "'") {
      // initialize at the opening double quote
      let value = string[this.cursor++];

      while (
        (string[this.cursor] !== '"' || string[this.cursor] !== "'") &&
        !this.isEOF()
      ) {
        value += string[this.cursor++];
      }

      // consume the closing double quote
      value += string[this.cursor];

      return {
        type: TOKEN_TYPE.STRING,
        value,
      };
    }

    return null;
  }
}
