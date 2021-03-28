const { fixed } = require('./helper');

class Matrix {
  //private methods

  //validate arguments
  static #validate = (...data) => {
    if (data.some((item) => !item || !Array.isArray(item)))
      throw new Error('Invalid argument: the matrix must be an array.');
    data.forEach((item) => this.#validateMatrix(item));
  };

  //validate single matrix
  static #validateMatrix = (matrix) => {
    if (matrix.some((item) => !Array.isArray(item)))
      throw new Error(
        'Invalid argument: the matrix must be an array of array/s. '
      );

    const rowLength = matrix[0].length;

    matrix.forEach((item) => {
      if (item.some((element) => typeof element !== 'number'))
        throw new Error(
          'Invalid argument: the row of the matrix is an array of numbers.'
        );

      if (item.length !== rowLength)
        throw new Error(
          'Invalid argument: the rows in the matrix must have the same number of elements.'
        );
    });
  };

  //checks if the matrices are of the same dimension
  static #validateDimension = (...data) => {
    const columnLength = data[0].length;
    const rowLength = data[0][0].length;
    data.forEach((item) => {
      if (item.length !== columnLength || item[0].length !== rowLength)
        throw new Error(
          'Invalid argument: the matrices must be of the same dimension.'
        );
    });
  };

  //check if the matrix is the square matrix
  static #validateSquare = (...data) => {
    data.forEach((item) => {
      if (!this.isSquare(item))
        throw new Error('Invalid argument: matrix must be the square matrix.');
    });
  };

  //validate number
  static #validateNumber = (value) => {
    if (typeof value !== 'number' || value === 0)
      throw new Error('Invalid argument: value must be number other than 0.');
  };

  //validate natural number
  static #validateNaturalNumber = (...data) => {
    data.forEach((item) => {
      if (
        typeof item !== 'number' ||
        item < 0 ||
        Math.floor(item) !== item ||
        item === Infinity
      )
        throw new Error('Invalid argument: required natural number.');
    });
  };

  //validate array index
  static #validateIndex = (arrayLength, ...data) => {
    data.forEach((item) => {
      this.#validateNaturalNumber(item);
      if (item < 0 || item >= arrayLength)
        throw new Error(
          `Invalid arguments: indexes must be numbers greater than 0 and less than ${
            arrayLength + 1
          }.`
        );
    });
  };

  //returns the matrix after deleting a specific row and column
  static #getSubMatrix = (matrix, indexDelRow, indexDelColumn) => {
    //deep copy array
    const subMatrix = [];
    matrix.forEach((row) => {
      subMatrix.push(Array.from(row));
    });

    //delete column and row
    subMatrix.splice(indexDelRow, 1);
    subMatrix.forEach((row) => {
      row.splice(indexDelColumn, 1);
    });

    return subMatrix;
  };

  //returns the determinant of a matrix
  static #det = (matrix) => {
    let detMatrix = 0;
    for (let i = 0; i < matrix.length; ++i) {
      if (matrix.length === 1) detMatrix += matrix[0][0];
      const subMatrix = this.#getSubMatrix(matrix, [i], [0]);
      const detSubMatrix = this.#det(subMatrix);
      detMatrix += (-1) ** (i + 2) * matrix[i][0] * detSubMatrix;
    }

    return fixed(detMatrix);
  };

  //public methods

  //returns the sum of matrixA and matrixB
  static add(m1, m2) {
    //validate
    this.#validate(m1, m2);
    this.#validateDimension(m1, m2);

    return m1.map((row, indexRow) => {
      return row.map((item, index) => fixed(item + m2[indexRow][index]));
    });
  }

  //subtraction of matrixA and matrixB
  static subtract(m1, m2) {
    //validate
    this.#validate(m1, m2);
    this.#validateDimension(m1, m2);

    return m1.map((row, indexRow) => {
      return row.map((item, index) => fixed(item - m2[indexRow][index]));
    });
  }

  //matrix multiplication by number
  static multiplyByNumber(m, x) {
    //validate
    this.#validate(m);

    //validate second argument
    if (typeof x !== 'number')
      throw new Error(
        'Invalid argument: the second argument must be a number.'
      );

    return m.map((row) => {
      return row.map((item) => fixed(item * x));
    });
  }

  //matrix multiplication
  static multiply(m1, m2) {
    //validate
    this.#validate(m1, m2);

    if (m1[0].length !== m2.length)
      throw new Error(
        'Invalid argument: first matrix must have the same number of columns as second matrix of rows.'
      );

    const result = [];

    m1.forEach((row, indexRow) => {
      result[indexRow] = [];
      for (let i = 0; i < m2[0].length; i++) {
        let value = 0;
        row.forEach((item, index) => {
          value += item * m2[index][i];
        });
        result[indexRow][i] = fixed(value);
      }
    });

    return result;
  }

  //changing the position of two columns
  static switchColumns(m, i, j) {
    const i1 = i - 1;
    const i2 = j - 1;

    this.#validate(m);
    this.#validateIndex(m[0].length, i1, i2);

    return m.map((row, rowIndex) => {
      const item1 = m[rowIndex][i1];
      const newRow = Array.from(row);
      newRow[i1] = row[i2];
      newRow[i2] = item1;
      return newRow;
    });
  }

  //changing the position of two rows
  static switchRows(m, i, j) {
    const i1 = i - 1;
    const i2 = j - 1;

    this.#validate(m);
    this.#validateIndex(m, i1, i2);

    const newMatrix = Array.from(m);
    const tmpRow1 = Array.from(m[i1]);
    newMatrix[i1] = Array.from(m[i2]);
    newMatrix[i2] = tmpRow1;
    return newMatrix;
  }

  //multiplying a column by a number
  static multiplyColumn(m, i, x) {
    const index = i - 1;

    this.#validate(m);
    this.#validateIndex(m[0].length, index);
    this.#validateNumber(x);

    return m.map((row) => {
      const newValue = fixed(row[index] * x);
      const newRow = Array.from(row);
      newRow[index] = newValue;
      return newRow;
    });
  }

  //multiplying a row by a number
  static multiplyRow(m, i, x) {
    const index = i - 1;

    this.#validate(m);
    this.#validateIndex(m.length, index);
    this.#validateNumber(x);

    const newMatrix = Array.from(m);
    newMatrix[index] = Array.from(m[index]);

    m[index].forEach((_, indexCol) => {
      const newValue = fixed(m[index][indexCol] * x);
      newMatrix[index][indexCol] = newValue;
    });

    return newMatrix;
  }

  //adding a column (multiplied by a number or not) to another column
  static addColToCol(m, i, j, x = 1) {
    const i1 = i - 1;
    const i2 = j - 1;

    this.#validate(m);
    this.#validateIndex(m[0].length, i1, i2);
    this.#validateNumber(x);

    return m.map((row) => {
      const newValue = fixed(row[i1] + x * row[i2]);
      const newRow = Array.from(row);
      newRow[i1] = newValue;
      return newRow;
    });
  }

  //adding a row (multiplied by a number or not) to another row
  static addRowToRow(m, i, j, x = 1) {
    const i1 = i - 1;
    const i2 = j - 1;

    this.#validate(m);
    this.#validateIndex(m.length, i1, i2);
    this.#validateNumber(x);

    const newMatrix = Array.from(m);
    newMatrix[i1] = Array.from(m[i1]);

    m[i1].forEach((_, indexCol) => {
      const newValue = fixed(m[i1][indexCol] + m[i2][indexCol] * x);
      newMatrix[i1][indexCol] = newValue;
    });

    return newMatrix;
  }

  //checking if matrices are equal
  static isEqual(m1, m2) {
    //validate
    this.#validate(m1, m2);
    this.#validateDimension(m1, m2);

    return m1.every((row, rowIndex) => {
      return row.every((item, index) => {
        return item === m2[rowIndex][index];
      });
    });
  }

  //checking if the matrix is square
  static isSquare(m) {
    //validate
    this.#validate(m);

    return m.length === m[0].length;
  }

  //checking if the matrix filled with 0 only
  static isZero(m) {
    //validate
    this.#validate(m);

    return m.every((row) => {
      return row.every((item) => item === 0);
    });
  }

  //checking if the matrix is triangular lower
  static isLowerTriangular(m) {
    //validate
    this.#validate(m);
    this.#validateSquare(m);

    if (m.length === 1) return true;

    let isLowerTriangular = true;
    let i = 1;
    while (i < m.length && isLowerTriangular) {
      let j = 0;
      while (j < i && isLowerTriangular) {
        if (m[i][j] !== 0) isLowerTriangular = false;
        ++j;
      }
      ++i;
    }

    return isLowerTriangular;
  }

  //checking if the matrix is triangular upper
  static isUpperTriangular(m) {
    //validate
    this.#validate(m);
    this.#validateSquare(m);

    if (m.length === 1) return true;

    let isUpperTriangular = true;
    let i = 0;
    while (i < m.length - 1 && isUpperTriangular) {
      let j = i + 1;
      while (j < m.length && isUpperTriangular) {
        if (m[i][j] !== 0) isUpperTriangular = false;
        ++j;
      }
      ++i;
    }

    return isUpperTriangular;
  }

  //checking if the matrix is triangular (upper and lower)
  static isTriangular(m) {
    return this.isLowerTriangular(m) || this.isUpperTriangular(m);
  }

  //checking if the matrix is diagonal
  static isDiagonal(m) {
    return this.isUpperTriangular(m) && this.isLowerTriangular(m);
  }

  //checking if the matrix is invertible
  static isInvertible(m) {
    return this.isNonSingular(m);
  }

  //checking if the matrix is singular
  static isSingular(m) {
    const det = this.getDeterminant(m);
    return det === 0;
  }

  //checking if the matrix is not singular
  static isNonSingular(m) {
    return !this.isSingular(m);
  }

  //checking if the matrix is symmetric
  static isSymmetric(m) {
    const transpose = this.getTranspose(m);
    return this.isEqual(m, transpose);
  }

  //checking if the matrix is antisymmetric
  static isAntisymmetric(m) {
    const transposeMatrix = this.getTranspose(m);
    const oppositeMatrix = this.getOpposite(m);
    return this.isEqual(transposeMatrix, oppositeMatrix);
  }

  //checking if the matrix is identity (it has 1 on the diagonal, 0 in others)
  static isIdentity(m) {
    //validate
    this.#validate(m);
    this.#validateSquare(m);

    const oneInDiagonal = this.getDiagonal(m).every((item) => item === 1);
    return this.isDiagonal(m) && oneInDiagonal;
  }

  //checks if matrix A is opposite to matrix B
  static isOpposite(m1, m2) {
    const oppositeMatrix1 = this.getOpposite(m1);
    return this.isEqual(m2, oppositeMatrix1);
  }

  //returns the matrix determinant
  static getDeterminant(m) {
    //validate
    this.#validate(m);
    this.#validateSquare(m);

    return this.#det(m);
  }

  //returns the identity matrix of the specified dimension
  static getIdentity(dim) {
    this.#validateNaturalNumber(dim);

    if (dim < 1)
      throw new Error(
        'Invalid argument: dimension must be number greater than 0.'
      );

    const diagonalMatrix = [];
    for (let i = 0; i < dim; i++) {
      const row = new Array(dim).fill(0);
      row[i] = 1;
      diagonalMatrix.push(row);
    }

    return diagonalMatrix;
  }

  //returns the diagonal of the matrix
  static getDiagonal(m) {
    //validate
    this.#validate(m);
    this.#validateSquare(m);

    return m.map((row, indexRow) => {
      return row[indexRow];
    });
  }

  //returns the opposite matrix
  static getOpposite(m) {
    //validate
    this.#validate(m);

    return m.map((row) => {
      return row.map((item) => {
        return item === 0 ? item : -item;
      });
    });
  }

  //returns a transposed matrix
  static getTranspose(m) {
    //validate
    this.#validate(m);

    const result = [];

    for (let i = 0; i < m[0].length; i++) {
      const row = [];
      for (let j = 0; j < m.length; j++) {
        row.push(m[j][i]);
      }
      result.push(row);
    }

    return result;
  }

  //return algebraic complement for a specific row and column
  static getAlgebraicComplement(m, i, j) {
    //validate
    this.#validate(m);
    this.#validateSquare(m);
    this.#validateNaturalNumber(i, j);

    if (m.length <= 1)
      throw new Error(
        'Invalid argument: the matrix dimension must be greater than 1.'
      );

    if (i < 1 || i > m.length || j < 1 || j > m.length)
      throw new Error(
        `Invalid argument: row index and column index must be number greater than 0 and less than ${
          m.length + 1
        }.`
      );

    const subMatrix = this.#getSubMatrix(m, [i - 1], [j - 1]);
    const det = this.#det(subMatrix);

    return fixed((-1) ** (i + j) * det);
  }

  //returns a matrix filled with algebraic complements for the specified column and row
  static getMatrixOfAlgebraicComplements(m) {
    return m.map((row, rowIndex) => {
      return row.map((_, index) => {
        return this.getAlgebraicComplement(m, rowIndex + 1, index + 1);
      });
    });
  }

  //return a invertible matrix
  static getInvertibleMatrix(m) {
    const det = this.getDeterminant(m);

    if (det === 0) return false;

    const matrixOfAlgebraicComplements = this.getMatrixOfAlgebraicComplements(
      m
    );
    const transposeAC = this.getTranspose(matrixOfAlgebraicComplements);
    return this.multiplyByNumber(transposeAC, 1 / det);
  }
}

module.exports = Matrix;
