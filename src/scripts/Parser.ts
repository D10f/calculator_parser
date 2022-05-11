import { Tokenizer } from './Tokenizer';
import { Token, TokenType, StringLiteral, NumericLiteral } from './types';

/**
 * Letter parser: recursive descent implementation
 */
export class Parser {
  private tokenizer: Tokenizer | null = null;
  private lookahead: Token | null = null;

  /**
   * Parses a string into an AST
   */
  parse(str: string) {
    if (str.length === 0) {
      throw new Error('Please provide a string with length greater than 0');
    }
    this.tokenizer = new Tokenizer(str);
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
  private Program() {
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
  private Literal() {
    switch (this.lookahead?.type) {
      case 'NUMBER':
        return this.NumericLiteral();
      case 'STRING':
        return this.StringLiteral();
    }
    throw new SyntaxError(`Literal: unexpected literal production`);
  }

  /**
   * StringLiteral
   *  : String
   *  ;
   */
  private StringLiteral(): StringLiteral {
    const token = this.eat('STRING');

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
  private NumericLiteral(): NumericLiteral {
    const token = this.eat('NUMBER');

    return {
      type: 'NumericLiteral',
      value: token.value as number,
    };
  }

  /**
   * Expects a token of a given type
   */
  private eat(tokenType: TokenType): Token {
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

    this.lookahead = this.tokenizer!.getNextToken();

    return token;
  }
}
