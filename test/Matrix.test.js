const { Matrix } = require('../mathematics/index');

test('Methods add(...), subtract(...), multiplyByNumber(...)', () => {
  const matrixA = [
    [0.2, 2],
    [-3, 3.5],
    [0, -3.2],
  ];
  const matrixB = [
    [0.1, 3],
    [-2, 0],
    [1.5, 1],
  ];
  expect(Matrix.add(matrixA, matrixB)).toStrictEqual([
    [0.3, 5],
    [-5, 3.5],
    [1.5, -2.2],
  ]);

  expect(Matrix.subtract(matrixA, matrixB)).toStrictEqual([
    [0.1, -1],
    [-1, 3.5],
    [-1.5, -4.2],
  ]);

  expect(Matrix.multiplyByNumber(matrixA, -2)).toStrictEqual([
    [-0.4, -4],
    [6, -7],
    [0, 6.4],
  ]);
});

test('Method multiply(...)', () => {
  const matrixA = [
    [1, 2],
    [-3, 3.5],
    [0, -3.2],
  ];
  const matrixB = [
    [2.1, 3, 1.5],
    [-2, 0, 1],
  ];

  expect(Matrix.multiply(matrixA, matrixB)).toStrictEqual([
    [-1.9, 3, 3.5],
    [-13.3, -9, -1],
    [6.4, 0, -3.2],
  ]);
});

test('Elementary matrix operations', () => {
  const matrix = [
    [1, 3],
    [0, -2],
    [1.5, -0.5],
  ];

  expect(Matrix.switchColumns(matrix, 1, 2)).toStrictEqual([
    [3, 1],
    [-2, 0],
    [-0.5, 1.5],
  ]);

  expect(Matrix.switchRows(matrix, 1, 3)).toStrictEqual([
    [1.5, -0.5],
    [0, -2],
    [1, 3],
  ]);

  expect(Matrix.multiplyColumn(matrix, 1, -2)).toStrictEqual([
    [-2, 3],
    [0, -2],
    [-3, -0.5],
  ]);

  expect(Matrix.multiplyRow(matrix, 2, 0.5)).toStrictEqual([
    [1, 3],
    [0, -1],
    [1.5, -0.5],
  ]);

  expect(Matrix.addColToCol(matrix, 1, 2, 3)).toStrictEqual([
    [10, 3],
    [-6, -2],
    [0, -0.5],
  ]);

  expect(Matrix.addRowToRow(matrix, 2, 1, 0.5)).toStrictEqual([
    [1, 3],
    [0.5, -0.5],
    [1.5, -0.5],
  ]);

  expect(Matrix.subtractColFromCol(matrix, 2, 1)).toStrictEqual([
    [1, 2],
    [0, -2],
    [1.5, -2],
  ]);

  expect(Matrix.subtractRowFromRow(matrix, 2, 3, 2)).toStrictEqual([
    [1, 3],
    [-3, -1],
    [1.5, -0.5],
  ]);
});

test('Method isEqual(...)', () => {
  const equalA = [[0.2], [-3]];
  const noEqualB = [[0.1], [-3]];
  expect(Matrix.isEqual(equalA, equalA)).toBe(true);
  expect(Matrix.isEqual(equalA, noEqualB)).toBe(false);
});

test('Method isSquare(...)', () => {
  const square = [
    [0.2, 1],
    [-3, 2],
  ];
  const noSquare = [[0.2], [-3]];
  expect(Matrix.isSquare(square)).toBe(true);
  expect(Matrix.isSquare(noSquare)).toBe(false);
});

test('Method isZero(...)', () => {
  const zero = [[0], [0]];
  const noZero = [
    [0, 0.1],
    [0, 0],
  ];

  expect(Matrix.isZero(noZero)).toBe(false);
  expect(Matrix.isZero(zero)).toBe(true);
});

test('Methods isLowerTriangular(...), isUpperTriangular(...), isTriangular(...)', () => {
  const matrix = [
    [1, 2, 3],
    [0, 2, 3],
    [0, 0, 3],
  ];
  const matrix2 = [
    [0, 0],
    [1, 1],
  ];
  expect(Matrix.isLowerTriangular(matrix)).toBe(true);
  expect(Matrix.isLowerTriangular(matrix2)).toBe(false);
  expect(Matrix.isUpperTriangular(matrix)).toBe(false);
  expect(Matrix.isUpperTriangular(matrix2)).toBe(true);
  expect(Matrix.isTriangular(matrix2)).toBe(true);
});

test('Method isDiagonal(...)', () => {
  const diagonal = [
    [1, 0, 0],
    [0, 2, 0],
    [0, 0, -3],
  ];
  const noDiagonal = [
    [1, 1],
    [0, 1],
  ];
  expect(Matrix.isDiagonal(diagonal)).toBe(true);
  expect(Matrix.isDiagonal(noDiagonal)).toBe(false);
});

test('Methods isInvertible(...), isSingular(...), isNonSingular(...)', () => {
  const matrix1 = [
    [1, 2, 0.5],
    [0, 2, 9],
    [-2, 0, 3],
  ];

  const matrix2 = [
    [-1, 3, 5],
    [8, 2, 0],
    [2, -6, -10],
  ];

  expect(Matrix.isInvertible(matrix1)).toBe(true);
  expect(Matrix.isInvertible(matrix2)).toBe(false);
  expect(Matrix.isSingular(matrix1)).toBe(false);
  expect(Matrix.isNonSingular(matrix1)).toBe(true);
});

test('Methods isSymmetric(...), isAntisymmetric(...)', () => {
  const matrix1 = [
    [1, 2, 0.5],
    [2, 2, 9],
    [0.5, 9, 3],
  ];

  const matrix2 = [
    [0, 0, 2],
    [0, 0, -1],
    [-2, 1, 0],
  ];

  expect(Matrix.isSymmetric(matrix1)).toBe(true);
  expect(Matrix.isSymmetric(matrix2)).toBe(false);
  expect(Matrix.isAntisymmetric(matrix2)).toBe(true);
});

test('Method isIdentity(...)', () => {
  const matrix1 = [
    [1, 0],
    [0, 1],
  ];
  const matrix2 = [
    [1, 0],
    [1, 1],
  ];

  expect(Matrix.isIdentity(matrix1)).toBe(true);
  expect(Matrix.isIdentity(matrix2)).toBe(false);
});

test('Method isOpposite(...)', () => {
  const matrix1 = [
    [2, 3],
    [4, -5],
  ];
  const matrix2 = [
    [-2, -3],
    [-4, 5],
  ];
  const matrix3 = [
    [2, -3],
    [4, -5],
  ];

  expect(Matrix.isOpposite(matrix1, matrix2)).toBe(true);
  expect(Matrix.isOpposite(matrix2, matrix3)).toBe(false);
});

test('Method getDeterminant(...)', () => {
  const matrix = [
    [1.5, 2, 3],
    [5, 0, -4],
    [5, 1, -2],
  ];
  expect(Matrix.getDeterminant(matrix)).toBe(1);
});

test('Method getIdentity(...)', () => {
  expect(Matrix.getIdentity(1)).toStrictEqual([[1]]);
});

test('Method getDiagonal(...)', () => {
  const matrix = [
    [1, 4, 2],
    [3, 2, 2],
    [0, 0, 3],
  ];
  expect(Matrix.getDiagonal(matrix)).toStrictEqual([1, 2, 3]);
});

test('Method getOpposite(...)', () => {
  const matrix = [
    [1, -2],
    [3, 0.5],
    [-3, 2],
  ];
  expect(Matrix.getOpposite(matrix)).toStrictEqual([
    [-1, 2],
    [-3, -0.5],
    [3, -2],
  ]);
});

test('Method getTranspose(...)', () => {
  const matrix = [
    [1, 2, -1],
    [0, 1, 6],
    [-1, 3, 2],
    [0, -3, 2],
  ];
  expect(Matrix.getTranspose(matrix)).toStrictEqual([
    [1, 0, -1, 0],
    [2, 1, 3, -3],
    [-1, 6, 2, 2],
  ]);
});

test('Method getAlgebraicComplement(...), getMatrixOfAlgebraicComplements(...)', () => {
  const matrix1 = [
    [-1, 2, 13],
    [2, 0, -3],
    [1, 1, 4],
  ];
  const matrix2 = [
    [1, 2],
    [0.5, -3],
  ];
  expect(Matrix.getAlgebraicComplement(matrix1, 2, 3)).toStrictEqual(3);
  expect(Matrix.getMatrixOfAlgebraicComplements(matrix2)).toStrictEqual([
    [-3, -0.5],
    [-2, 1],
  ]);
});

test('Method getInvertibleMatrix(...)', () => {
  const matrix = [
    [1, 2],
    [3, 4],
  ];
  expect(Matrix.getInvertibleMatrix(matrix)).toStrictEqual([
    [-2, 1],
    [1.5, -0.5],
  ]);
});

// Errors
test('Error: no arguments', () => {
  expect(() => {
    Matrix.add();
  }).toThrow('Invalid argument: the matrix must be an array.');
});

test('Error: invalid argument/s', () => {
  expect(() => {
    Matrix.getDeterminant('Test');
  }).toThrow('Invalid argument: the matrix must be an array.');

  expect(() => {
    Matrix.getDeterminant([1, 2, 3]);
  }).toThrow('Invalid argument: the matrix must be an array of array/s.');

  expect(() => {
    Matrix.getDiagonal([
      ['1', 2],
      [3, 1],
    ]);
  }).toThrow('Invalid argument: the row of the matrix is an array of numbers.');

  expect(() => {
    Matrix.getDeterminant([[1, 2], [3]]);
  }).toThrow(
    'Invalid argument: the rows in the matrix must have the same number of elements.'
  );

  expect(() => {
    Matrix.add(
      [
        [1, 2],
        [2, 3],
      ],
      [[1], [2]]
    );
  }).toThrow('Invalid argument: the matrices must be of the same dimension.');

  expect(() => {
    Matrix.isIdentity([
      [1, 0],
      [0, 1],
      [0, 0],
    ]);
  }).toThrow('Invalid argument: matrix must be the square matrix.');

  expect(() => {
    Matrix.multiplyColumn([[1]], 1, '2.3');
  }).toThrow('Invalid argument: value must be number other than 0.');

  expect(() => {
    Matrix.getIdentity(2.4);
  }).toThrow('Invalid argument: required natural number.');

  expect(() => {
    Matrix.addColToCol([[1, 2]], 1, 3);
  }).toThrow(
    'Invalid arguments: indexes must be numbers greater than 0 and less than 3.'
  );

  expect(() => {
    Matrix.multiplyByNumber([[1, 2]], '2');
  }).toThrow('Invalid argument: the second argument must be a number.');

  expect(() => {
    Matrix.multiply([[1, 2]], [[1], [2], [3]]);
  }).toThrow(
    'Invalid argument: matrixA must have the same number of columns as matrixB of rows.'
  );

  expect(() => {
    Matrix.getIdentity(0);
  }).toThrow('Invalid argument: dimension must be number greater than 0.');

  expect(() => {
    Matrix.getAlgebraicComplement([[1]], 1, 1);
  }).toThrow('Invalid argument: the matrix dimension must be greater than 1.');

  expect(() => {
    Matrix.getAlgebraicComplement(
      [
        [1, 2],
        [2, 3],
      ],
      3,
      3
    );
  }).toThrow(
    'Invalid argument: row index and column index must be number greater than 0 and less than 3.'
  );
});
