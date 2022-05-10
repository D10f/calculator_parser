import { Tokenizer } from './Tokenizer';
import {
  Token,
  TOKEN_TYPE,
  StringLiteralToken,
  NumericLiteralToken,
} from './types';

/**
 * Letter parser: recursive descent implementation
 */
export class Parser {
  constructor(
    private str: string = '',
    private lookahead: Token | null = null,
    private tokenizer: Tokenizer = new Tokenizer(),
  ) {}

  /**
   * Parses a string into an AST
   */
  parse(str: string) {
    this.str = str;
    this.tokenizer.init(str);

    this.lookahead = this.tokenizer.getNextToken();

    return this.Program();
  }

  /**
   * Main entry point
   *
   * Program
   *  : NumericLiteral
   *  ;
   */
  Program() {
    return {
      type: 'Program',
      body: this.Literal(),
    };
  }

  /**
   * Literal
   *  : NumericLiteral
   *  | StringLiteral
   *  ;
   */
  Literal() {
    switch (this.lookahead?.type) {
      case TOKEN_TYPE.NUMBER:
        return this.NumericLiteral();
      case TOKEN_TYPE.STRING:
        return this.StringLiteral();
    }

    throw new SyntaxError(`Literal: unexpected literal production`);
  }

  /**
   * StringLiteral
   *  : String
   *  ;
   */
  StringLiteral(): StringLiteralToken {
    const token = this.eat(TOKEN_TYPE.STRING);

    return {
      type: 'StringLiteral',
      value: (token.value as string).slice(1, -1), // remove quotes
    };
  }

  /**
   * NumericLiteral
   *  : Number
   *  ;
   */
  NumericLiteral(): NumericLiteralToken {
    const token = this.eat(TOKEN_TYPE.NUMBER);

    return {
      type: 'NumericLiteral',
      value: token.value as number,
    };
  }

  /**
   * Expects a token of a given type
   *
   */
  eat(tokenType: TOKEN_TYPE): Token {
    const token = this.lookahead;

    if (token === null) {
      throw new SyntaxError(
        `Unexpected end of input, expected: "${tokenType}".`,
      );
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token: "${token.value}", expected: "${tokenType}".`,
      );
    }

    this.lookahead = this.tokenizer.getNextToken();

    return token;
  }
}
