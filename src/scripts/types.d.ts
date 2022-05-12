type TokenType =
  | 'STRING'
  | 'NUMBER'
  | 'SKIP'
  | ';'
  | '('
  | ')'
  | 'ADDITIVE_OPERATOR'
  | 'MULTIPLICATIVE_OPERATOR';

type NumericLiteral = {
  type: 'NumericLiteral';
  value: number;
};

type StringLiteral = {
  type: 'StringLiteral';
  value: string;
};

type AdditiveOperator = '+' | '-';
type MultiplicativeOperator = '*';
type MathOperator = AdditiveOperator | MultiplicativeOperator;

type BinaryExpression =
  | NumericLiteral
  | {
      type: 'BinaryExpression';
      operator: MathOperator;
      left: BinaryExpression;
      right: BinaryExpression;
    };

type Token = {
  type: TokenType;
  value: string | number;
};

type TokenizerSpec = [RegExp, TokenType][];
