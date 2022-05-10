// import { Calculator } from './scripts/Calculator';
import { Parser } from './scripts/Parser';
// import './main.css';

// new Calculator('main');
const parser = new Parser();

const program = '"Hello"';

const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));
