export enum TOKEN_TYPE {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
}

export type TokenType = TOKEN_TYPE;
export type TokenValue = string | number;

export type NumericLiteralToken = {
  type: 'NumericLiteral';
  value: number;
};

export type StringLiteralToken = {
  type: 'StringLiteral';
  value: string;
};

export type Token = {
  type: TokenType;
  value: TokenValue;
};
