export type TokenType =
  | 'STRING'
  | 'NUMBER'
  | 'SKIP'
  | ';'
  | 'ADDITIVE_OPERATOR'
  | 'MULTIPLICATIVE_OPERATOR';

export type NumericLiteral = {
  type: 'NumericLiteral';
  value: number;
};

export type StringLiteral = {
  type: 'StringLiteral';
  value: string;
};

export type AdditiveOperator = '+' | '-';
export type MultiplicativeOperator = '*';
export type MathOperator = AdditiveOperator | MultiplicativeOperator;

export type BinaryExpression =
  | NumericLiteral
  | {
      type: 'BinaryExpression';
      operator: MathOperator;
      left: BinaryExpression;
      right: BinaryExpression;
    };

export type Token = {
  type: TokenType;
  value: string | number;
};

export type TokenizerSpec = [RegExp, TokenType][];
