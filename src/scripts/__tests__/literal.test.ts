import { Parser } from '../Parser';

describe('Literal test suite', () => {
  const parser = new Parser();

  test('Should parse numeric literals', () => {
    const program = `42;`;
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: '42',
          },
        },
      ],
    });
  });

  test('Should fail when no semi-colon is provided', () => {
    const program = `42`;
    const result = () => parser.parse(program);
    expect(result).toThrowError(SyntaxError);
    expect(result).toThrowError(`Unexpected end of input, expected: ";".`);
  });

  test('Should parse string literals using double quotes', () => {
    const program = `"Hello world";`;
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'Hello world',
          },
        },
      ],
    });
  });

  test('Should parse string literals using double quotes', () => {
    const program = `'Hello world';`;
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'Hello world',
          },
        },
      ],
    });
  });

  test('Should parse multiple statements', () => {
    const program = `
      'Hello world';
      "How old are you?";
      42;
    `;
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'Hello world',
          },
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'How old are you?',
          },
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: '42',
          },
        },
      ],
    });
  });
});
