// import { Calculator } from './scripts/Calculator';
import { Parser } from './scripts/Parser';

import './main.css';

// new Calculator('main');

const parser = new Parser();

function exec() {
  const program = `
  /**
   * Docstring
   */
   "42"
`;

  const ast = parser.parse(program);

  console.log(JSON.stringify(ast, null, 2));
}

// const test: TestFunction = (program, expected) => {
//   const ast = parser.parse(program);
//   assert.deepEqual(ast, expected);
// };

// [literalTest].forEach((testSuite) => testSuite(test));
