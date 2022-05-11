import { Tokenizer } from './Tokenizer';
import {
  Token,
  TokenType,
  StringLiteral,
  NumericLiteral,
  BinaryExpression,
  MathOperator,
} from './types';

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
      body: this.StatementList(),
    };
  }

  /**
   * StatementList
   *  : Statement
   *  | StatemetList Statement
   *  ;
   */
  private StatementList() {
    const statementList = [this.Statement()];

    while (this.lookahead !== null) {
      statementList.push(this.Statement());
    }

    return statementList;
  }

  /**
   * Statement
   *  : ExpressionStatement
   *  ;
   */
  private Statement() {
    return this.ExpressionStatement();
  }

  /**
   * ExpressionStatement
   *  : Expression ';'
   *  ;
   */
  private ExpressionStatement() {
    const expression = this.Expression();
    this.eat(';');

    return {
      type: 'ExpressionStatement',
      expression,
    };
  }

  /**
   * Expression
   *  : Literal
   *  ;
   */
  private Expression() {
    return this.AdditiveExpression();
  }

  /**
   * AdditiveExpression
   *  : Literal
   *  | AdditiveExpression ADDITIVE_OPERATOR Literal
   */
  private AdditiveExpression() {
    let left = this.MultiplicativeExpression() as BinaryExpression;

    while (this.lookahead?.type === 'ADDITIVE_OPERATOR') {
      const operator = this.eat('ADDITIVE_OPERATOR').value as MathOperator;
      const right = this.MultiplicativeExpression() as BinaryExpression;

      left = {
        type: 'BinaryExpression',
        operator,
        left,
        right,
      };
    }

    return left;
  }

  /**
   * MultiplicativeExpression
   *  : Literal
   *  | PrimaryExpression MULTIPLICATIVE_OPERATOR PrimaryExpression
   */
  private MultiplicativeExpression() {
    let left = this.PrimaryExpression() as BinaryExpression;

    while (this.lookahead?.type === 'MULTIPLICATIVE_OPERATOR') {
      const operator = this.eat('MULTIPLICATIVE_OPERATOR')
        .value as MathOperator;
      const right = this.PrimaryExpression() as BinaryExpression;

      left = {
        type: 'BinaryExpression',
        operator,
        left,
        right,
      };
    }

    return left;
  }

  /**
   * PrimaryExpression
   *  : Literal
   *  ;
   */
  private PrimaryExpression() {
    return this.Literal();
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
