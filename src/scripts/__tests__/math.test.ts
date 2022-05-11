import { Parser } from '../Parser';

describe('Binary expressions test suite', () => {
  const parser = new Parser();

  test('Should add two numbers together', () => {
    const program = '2+2;';
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'NumericLiteral',
              value: '2',
            },
            right: {
              type: 'NumericLiteral',
              value: '2',
            },
          },
        },
      ],
    });
  });

  test('Should add several numbers together', () => {
    const program = '3+2+2;';
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'NumericLiteral',
                value: '3',
              },
              right: {
                type: 'NumericLiteral',
                value: '2',
              },
            },
            right: {
              type: 'NumericLiteral',
              value: '2',
            },
          },
        },
      ],
    });
  });

  test('Should add & subtract several numbers together', () => {
    const program = '4+5-6;';
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '-',
            left: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'NumericLiteral',
                value: '4',
              },
              right: {
                type: 'NumericLiteral',
                value: '5',
              },
            },
            right: {
              type: 'NumericLiteral',
              value: '6',
            },
          },
        },
      ],
    });
  });

  test('Should multiply several numbers together', () => {
    const program = '2*6*4;';
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '*',
            left: {
              type: 'BinaryExpression',
              operator: '*',
              left: {
                type: 'NumericLiteral',
                value: '2',
              },
              right: {
                type: 'NumericLiteral',
                value: '6',
              },
            },
            right: {
              type: 'NumericLiteral',
              value: '4',
            },
          },
        },
      ],
    });
  });

  test('Should add & multiply several numbers together, preserving math operator precedence', () => {
    const program = '2+6*4;';
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'NumericLiteral',
              value: '2',
            },
            right: {
              type: 'BinaryExpression',
              operator: '*',
              left: {
                type: 'NumericLiteral',
                value: '6',
              },
              right: {
                type: 'NumericLiteral',
                value: '4',
              },
            },
          },
        },
      ],
    });
  });

  test('Should subtract & divide several numbers together, preserving math operator precedence', () => {
    const program = '2/6-4;';
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '-',
            left: {
              type: 'BinaryExpression',
              operator: '/',
              left: {
                type: 'NumericLiteral',
                value: '2',
              },
              right: {
                type: 'NumericLiteral',
                value: '6',
              },
            },
            right: {
              type: 'NumericLiteral',
              value: '4',
            },
          },
        },
      ],
    });
  });
});
