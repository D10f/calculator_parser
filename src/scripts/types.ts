export type TokenType = 'STRING' | 'NUMBER' | 'SKIP' | ';';

export type NumericLiteral = {
  type: 'NumericLiteral';
  value: number;
};

export type StringLiteral = {
  type: 'StringLiteral';
  value: string;
};

export type Token = {
  type: TokenType;
  value: string | number;
};

export type TokenizerSpec = [RegExp, TokenType][];
