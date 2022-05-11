import { Parser } from '../Parser';

describe('StatementList test suite', () => {
  const parser = new Parser();

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
