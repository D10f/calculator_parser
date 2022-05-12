export function mathInterpreter(ast: any): number {
  if (ast.type === 'Program') {
    return mathInterpreter(ast.body[0].expression);
  }

  if (ast.type === 'ExpressionStatement') {
    return mathInterpreter(ast.expression);
  }

  if (ast.type === 'NumericLiteral') {
    return Number(ast.value);
  }

  switch (ast.operator) {
    case '+':
      return mathInterpreter(ast.left) + mathInterpreter(ast.right);
    case '-':
      return mathInterpreter(ast.left) - mathInterpreter(ast.right);
    case '*':
    case '×':
    case 'x':
    case 'X':
      return mathInterpreter(ast.left) * mathInterpreter(ast.right);
    case '^':
      return mathInterpreter(ast.left) ** mathInterpreter(ast.right);
    case '/':
      return mathInterpreter(ast.left) / mathInterpreter(ast.right);
    case '%':
      return mathInterpreter(ast.left) % mathInterpreter(ast.right);
  }

  return 1;
}
