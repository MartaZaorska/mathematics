const { Vector } = require('../mathematics/index');

test('Method createVector(): points A(-2,10,4.5) and B(1.3, -2, 0)', () => {
  expect(Vector.createVector([-2, 10, 4.5], [1.3, -2, 0])).toStrictEqual([
    3.3,
    -12,
    -4.5,
  ]);
});

test('Method getLengthVector(): vector [1.2, -7]', () => {
  expect(Vector.getLengthVector([1.2, -7])).toBe(7.102);
});

test('Method getOppositeVector(): vector [0, 2.5, -3]', () => {
  expect(Vector.getOppositeVector([0, 2.5, -3])).toStrictEqual([0, -2.5, 3]);
});

test('Method getCenterPointVector(): points A[-10] and B[2.5]', () => {
  expect(Vector.getCenterPointVector([-10], [2.5])).toStrictEqual([-3.75]);
});

test('Method multiplyVector(): vector [1, 0, -0.5] and value 2.25', () => {
  expect(Vector.multiplyVector([1, 0, -0.5], 2.25)).toStrictEqual([
    2.25,
    0,
    -1.125,
  ]);
});

test('Method addVectors(): vectors [-2, 3.5] and [6, 10.2]', () => {
  expect(Vector.addVectors([-2, 3.5], [6, 10.2])).toStrictEqual([4, 13.7]);
});

test('Method subtractVectors(): vectors [-10.2, 0] and [1,2]', () => {
  expect(Vector.subtractVectors([-10.2, 0], [1, 2])).toStrictEqual([-11.2, -2]);
});

test('Method crossProduct(): vectors [1,2,4] and [0,1,0]', () => {
  expect(Vector.crossProduct([1, 2, 4], [0, 1, 0])).toStrictEqual([-4, 0, 1]);
});

test('Method scalarProduct(): vectors [10,4] and [-3,1]', () => {
  expect(Vector.scalarProduct([10, 4], [-3, 1])).toBe(-26);
});

test('Method tripleProduct(): vectors [1,2,3], [-1,2,0] and [1,1,-1]', () => {
  expect(Vector.tripleProduct([1, 2, 3], [-1, 2, 0], [1, 1, -1])).toBe(-13);
});

//Errors
test('Error: no arguments', () => {
  expect(() => {
    Vector.createVector();
  }).toThrow('Invalid vector: arguments are required.');
});

test('Error: array of 5 elements', () => {
  expect(() => {
    Vector.multiplyVector([1, 2, 3, 4, 5], 2);
  }).toThrow(
    'Invalid vector: the argument must be an array of 1, 2 or 3 elements.'
  );
});

test('Error: invalid argument type', () => {
  expect(() => {
    Vector.getOppositeVector('[1,2,3]');
  }).toThrow(
    'Invalid vector: the argument must be an array of 1, 2 or 3 elements.'
  );
});

test('Error: vectors of different lengths', () => {
  expect(() => {
    Vector.addVectors([1, 2, 3], [1, 2]);
  }).toThrow('Invalid vector: arguments must be an array of the same length.');
});

test('Error: vectors of different lengths', () => {
  expect(() => {
    Vector.addVectors([1, 2, 3], [1, 2]);
  }).toThrow('Invalid vector: arguments must be an array of the same length.');
});

test('Error: vectors with a string', () => {
  expect(() => {
    Vector.addVectors(['2', 3], [1, 2]);
  }).toThrow('Invalid vector: the array must contain numbers.');
});

test('Error: second argument is a string instead of a number', () => {
  expect(() => {
    Vector.multiplyVector([2, 3], '3');
  }).toThrow('Invalid argument: value must be a number.');
});

test('Error: a two-dimensional vector instead of a three-dimensional vector', () => {
  expect(() => {
    Vector.crossProduct([2, 3], [3, 4]);
  }).toThrow(
    'Invalid argument: vectors must be an array containing three numbers.'
  );
});
