export const isNumber = (token: string | number) =>
  !Number.isNaN(Number(token));
