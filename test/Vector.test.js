const { Vector } = require('../mathematics/index');

test('Method create(): points A(-2,10,4.5) and B(1.3, -2, 0)', () => {
  expect(Vector.create([-2, 10, 4.5], [1.3, -2, 0])).toStrictEqual([
    3.3,
    -12,
    -4.5,
  ]);
});

test('Method getNorm(): vector [2, 3.5, 1, -5]', () => {
  expect(Vector.getNorm([2, 3.5, 1, -5])).toBe(6.5);
});

test('Method getLength(): vector [1.2, -7]', () => {
  expect(Vector.getLength([1.2, -7])).toBe(7.102);
});

test('Method getOpposite(): vector [0, 2.5, -3]', () => {
  expect(Vector.getOpposite([0, 2.5, -3])).toStrictEqual([0, -2.5, 3]);
});

test('Method multiply(): vector [1, 0, -0.5] and value 2.25', () => {
  expect(Vector.multiply([1, 0, -0.5], 2.25)).toStrictEqual([2.25, 0, -1.125]);
});

test('Method add(): vectors [-2, 3.5] and [6, 10.2]', () => {
  expect(Vector.add([-2, 3.5], [6, 10.2])).toStrictEqual([4, 13.7]);
});

test('Method subtract(): vectors [-10.2, 0] and [1,2]', () => {
  expect(Vector.subtract([-10.2, 0], [1, 2])).toStrictEqual([-11.2, -2]);
});

test('Method scalarProduct(): vectors [10,4] and [-3,1]', () => {
  expect(Vector.scalarProduct([10, 4], [-3, 1])).toBe(-26);
});

test('Method isOrthogonal(): vectors [2,-1] and [3,6]', () => {
  expect(Vector.isOrthogonal([2, -1], [3, 6])).toBe(true);
});

test('Method areOrthogonal(): vectors [1,0], [1,2], [2,-1]', () => {
  expect(Vector.areOrthogonal([1, 0], [1, 2], [2, -1])).toBe(false);
});

test('Method getAngle(): vectors [1,1], [1,0]', () => {
  expect(Vector.getAngle([1, 1], [1, 0])).toBe(45);
});

//Errors
test('Error: no arguments', () => {
  expect(() => {
    Vector.create();
  }).toThrow('Invalid vector: arguments are required.');
});

test('Error: array of 5 elements', () => {
  expect(() => {
    Vector.multiply([], 2);
  }).toThrow('Invalid vector: the argument must be an array (not empty).');
});

test('Error: invalid argument type', () => {
  expect(() => {
    Vector.getOpposite('[1,2,3]');
  }).toThrow('Invalid vector: the argument must be an array (not empty).');
});

test('Error: vectors of different lengths', () => {
  expect(() => {
    Vector.add([1, 2, 3], [1, 2]);
  }).toThrow('Invalid vector: arguments must be an array of the same length.');
});

test('Error: vectors of different lengths', () => {
  expect(() => {
    Vector.add([1, 2, 3], [1, 2]);
  }).toThrow('Invalid vector: arguments must be an array of the same length.');
});

test('Error: vectors with a string', () => {
  expect(() => {
    Vector.add(['2', 3], [1, 2]);
  }).toThrow('Invalid vector: the array must contain numbers.');
});

test('Error: second argument is a string instead of a number', () => {
  expect(() => {
    Vector.multiply([2, 3], '3');
  }).toThrow('Invalid argument: x must be a number.');
});
