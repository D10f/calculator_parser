import { Parser } from '../Parser';

describe('Literal test suite', () => {
  const parser = new Parser();

  test('Should parse numeric literals', () => {
    const program = `42`;
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: {
        type: 'NumericLiteral',
        value: '42',
      },
    });
  });

  test('Should parse string literals using double quotes', () => {
    const program = `"Hello world"`;
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: {
        type: 'StringLiteral',
        value: 'Hello world',
      },
    });
  });

  test('Should parse string literals using double quotes', () => {
    const program = `'Hello world'`;
    const ast = parser.parse(program);

    expect(ast).toEqual({
      type: 'Program',
      body: {
        type: 'StringLiteral',
        value: 'Hello world',
      },
    });
  });
});
