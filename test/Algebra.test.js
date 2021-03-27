const { Algebra } = require('../mathematics/index');

test('Method factorial(n) for n = 10', () => {
  expect(Algebra.factorial(10)).toBe(3628800);
});

test('Method factorial(n) for n = 0', () => {
  expect(Algebra.factorial(0)).toBe(1);
});

test('Method symbolNewton(n,k) for n = 7 and k = 3', () => {
  expect(Algebra.symbolNewton(7, 3)).toBe(35);
});

test('Method binomialTheorem(n) for n = 5', () => {
  expect(Algebra.binomialTheorem(5)).toBe(
    '(a+b)^5 = (a^5) + 5*(a^4)*b + 10*(a^3)*(b^2) + 10*(a^2)*(b^3) + 5*a*(b^4) + (b^5)'
  );
});

//errors

test('Error: argument must be a number', () => {
  expect(() => {
    Algebra.factorial('3');
  }).toThrow('Invalid argument: required natural number.');
});

test('Error: argument must be a natural number', () => {
  expect(() => {
    Algebra.factorial(1.24);
  }).toThrow('Invalid argument: required natural number.');
});

test('Error: invalid argument values', () => {
  expect(() => {
    Algebra.symbolNewton(2, 5);
  }).toThrow('Invalid argument: "n" must be greater or equal than "k".');
});
