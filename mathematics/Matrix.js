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
  static add(matrixA, matrixB) {
    //validate
    this.#validate(matrixA, matrixB);
    this.#validateDimension(matrixA, matrixB);

    return matrixA.map((row, indexRow) => {
      return row.map((item, index) => fixed(item + matrixB[indexRow][index]));
    });
  }

  //subtraction of matrixA and matrixB
  static subtract(matrixA, matrixB) {
    //validate
    this.#validate(matrixA, matrixB);
    this.#validateDimension(matrixA, matrixB);

    return matrixA.map((row, indexRow) => {
      return row.map((item, index) => fixed(item - matrixB[indexRow][index]));
    });
  }

  //matrix multiplication by number
  static multiplyByNumber(matrix, value) {
    //validate
    this.#validate(matrix);

    //validate second argument
    if (typeof value !== 'number')
      throw new Error(
        'Invalid argument: the second argument must be a number.'
      );

    return matrix.map((row) => {
      return row.map((item) => fixed(item * value));
    });
  }

  //matrix multiplication
  static multiply(matrixA, matrixB) {
    //validate
    this.#validate(matrixA, matrixB);

    if (matrixA[0].length !== matrixB.length)
      throw new Error(
        'Invalid argument: matrixA must have the same number of columns as matrixB of rows.'
      );

    const result = [];

    matrixA.forEach((row, indexRow) => {
      result[indexRow] = [];
      for (let i = 0; i < matrixB[0].length; i++) {
        let value = 0;
        row.forEach((item, index) => {
          value += item * matrixB[index][i];
        });
        result[indexRow][i] = fixed(value);
      }
    });

    return result;
  }

  //changing the position of two columns
  static switchColumns(matrix, indexCol1, indexCol2) {
    const i1 = indexCol1 - 1;
    const i2 = indexCol2 - 1;

    this.#validate(matrix);
    this.#validateIndex(matrix[0].length, i1, i2);

    return matrix.map((row, rowIndex) => {
      const item1 = matrix[rowIndex][i1];
      const newRow = Array.from(row);
      newRow[i1] = row[i2];
      newRow[i2] = item1;
      return newRow;
    });
  }

  //changing the position of two rows
  static switchRows(matrix, indexRow1, indexRow2) {
    const i1 = indexRow1 - 1;
    const i2 = indexRow2 - 1;

    this.#validate(matrix);
    this.#validateIndex(matrix.length, i1, i2);

    const newMatrix = Array.from(matrix);
    const tmpRow1 = Array.from(matrix[i1]);
    newMatrix[i1] = Array.from(matrix[i2]);
    newMatrix[i2] = tmpRow1;
    return newMatrix;
  }

  //multiplying a column by a number
  static multiplyColumn(matrix, indexColumn, value) {
    const i = indexColumn - 1;

    this.#validate(matrix);
    this.#validateIndex(matrix[0].length, i);
    this.#validateNumber(value);

    return matrix.map((row) => {
      const newValue = fixed(row[i] * value);
      const newRow = Array.from(row);
      newRow[i] = newValue;
      return newRow;
    });
  }

  //multiplying a row by a number
  static multiplyRow(matrix, indexRow, value) {
    const i = indexRow - 1;

    this.#validate(matrix);
    this.#validateIndex(matrix.length, i);
    this.#validateNumber(value);

    const newMatrix = Array.from(matrix);
    newMatrix[i] = Array.from(matrix[i]);

    matrix[i].forEach((_, index) => {
      const newValue = fixed(matrix[i][index] * value);
      newMatrix[i][index] = newValue;
    });

    return newMatrix;
  }

  //adding a column (multiplied by a number or not) to another column
  static addColToCol(matrix, indexCol, indexAddCol, value = 1) {
    const i = indexCol - 1;
    const iA = indexAddCol - 1;

    this.#validate(matrix);
    this.#validateIndex(matrix[0].length, i, iA);
    this.#validateNumber(value);

    return matrix.map((row) => {
      const newValue = fixed(row[i] + value * row[iA]);
      const newRow = Array.from(row);
      newRow[i] = newValue;
      return newRow;
    });
  }

  //subtracting a column (multiplied by a number or not) from another column
  static subtractColFromCol(matrix, indexCol, indexSubtractCol, value = 1) {
    return this.addColToCol(matrix, indexCol, indexSubtractCol, -value);
  }

  //adding a row (multiplied by a number or not) to another row
  static addRowToRow(matrix, indexRow, indexAddRow, value = 1) {
    const i = indexRow - 1;
    const iA = indexAddRow - 1;

    this.#validate(matrix);
    this.#validateIndex(matrix.length, i, iA);
    this.#validateNumber(value);

    const newMatrix = Array.from(matrix);
    newMatrix[i] = Array.from(matrix[i]);

    matrix[i].forEach((_, index) => {
      const newValue = fixed(matrix[i][index] + matrix[iA][index] * value);
      newMatrix[i][index] = newValue;
    });

    return newMatrix;
  }

  //subtracting a row (multiplied by a number or not) from another row
  static subtractRowFromRow(matrix, indexRow, indexAddRow, value = 1) {
    return this.addRowToRow(matrix, indexRow, indexAddRow, -value);
  }

  //checking if matrices are equal
  static isEqual(matrixA, matrixB) {
    //validate
    this.#validate(matrixA, matrixB);
    this.#validateDimension(matrixA, matrixB);

    return matrixA.every((row, rowIndex) => {
      return row.every((item, index) => {
        return item === matrixB[rowIndex][index];
      });
    });
  }

  //checking if the matrix is square
  static isSquare(matrix) {
    //validate
    this.#validate(matrix);

    return matrix.length === matrix[0].length;
  }

  //checking if the matrix filled with 0 only
  static isZero(matrix) {
    //validate
    this.#validate(matrix);

    return matrix.every((row) => {
      return row.every((item) => item === 0);
    });
  }

  //checking if the matrix is triangular lower
  static isLowerTriangular(matrix) {
    //validate
    this.#validate(matrix);
    this.#validateSquare(matrix);

    if (matrix.length === 1) return true;

    let isLowerTriangular = true;
    let i = 1;
    while (i < matrix.length && isLowerTriangular) {
      let j = 0;
      while (j < i && isLowerTriangular) {
        if (matrix[i][j] !== 0) isLowerTriangular = false;
        ++j;
      }
      ++i;
    }

    return isLowerTriangular;
  }

  //checking if the matrix is triangular upper
  static isUpperTriangular(matrix) {
    //validate
    this.#validate(matrix);
    this.#validateSquare(matrix);

    if (matrix.length === 1) return true;

    let isUpperTriangular = true;
    let i = 0;
    while (i < matrix.length - 1 && isUpperTriangular) {
      let j = i + 1;
      while (j < matrix.length && isUpperTriangular) {
        if (matrix[i][j] !== 0) isUpperTriangular = false;
        ++j;
      }
      ++i;
    }

    return isUpperTriangular;
  }

  //checking if the matrix is triangular (upper and lower)
  static isTriangular(matrix) {
    return this.isLowerTriangular(matrix) || this.isUpperTriangular(matrix);
  }

  //checking if the matrix is diagonal
  static isDiagonal(matrix) {
    return this.isUpperTriangular(matrix) && this.isLowerTriangular(matrix);
  }

  //checking if the matrix is invertible
  static isInvertible(matrix) {
    return this.isNonSingular(matrix);
  }

  //checking if the matrix is singular
  static isSingular(matrix) {
    const det = this.getDeterminant(matrix);
    return det === 0;
  }

  //checking if the matrix is not singular
  static isNonSingular(matrix) {
    return !this.isSingular(matrix);
  }

  //checking if the matrix is symmetric
  static isSymmetric(matrix) {
    const transpose = this.getTranspose(matrix);
    return this.isEqual(matrix, transpose);
  }

  //checking if the matrix is antisymmetric
  static isAntisymmetric(matrix) {
    const transposeMatrix = this.getTranspose(matrix);
    const oppositeMatrix = this.getOpposite(matrix);
    return this.isEqual(transposeMatrix, oppositeMatrix);
  }

  //checking if the matrix is identity (it has 1 on the diagonal, 0 in others)
  static isIdentity(matrix) {
    //validate
    this.#validate(matrix);
    this.#validateSquare(matrix);

    const oneInDiagonal = this.getDiagonal(matrix).every((item) => item === 1);
    return this.isDiagonal(matrix) && oneInDiagonal;
  }

  //checks if matrix A is opposite to matrix B
  static isOpposite(matrixA, matrixB) {
    const oppositeMatrixA = this.getOpposite(matrixA);
    return this.isEqual(matrixB, oppositeMatrixA);
  }

  //returns the matrix determinant
  static getDeterminant(matrix) {
    //validate
    this.#validate(matrix);
    this.#validateSquare(matrix);

    return this.#det(matrix);
  }

  //returns the identity matrix of the specified dimension
  static getIdentity(dimension) {
    this.#validateNaturalNumber(dimension);

    if (dimension < 1)
      throw new Error(
        'Invalid argument: dimension must be number greater than 0.'
      );

    const diagonalMatrix = [];
    for (let i = 0; i < dimension; i++) {
      const row = new Array(dimension).fill(0);
      row[i] = 1;
      diagonalMatrix.push(row);
    }

    return diagonalMatrix;
  }

  //returns the diagonal of the matrix
  static getDiagonal(matrix) {
    //validate
    this.#validate(matrix);
    this.#validateSquare(matrix);

    return matrix.map((row, indexRow) => {
      return row[indexRow];
    });
  }

  //returns the opposite matrix
  static getOpposite(matrix) {
    //validate
    this.#validate(matrix);

    return matrix.map((row) => {
      return row.map((item) => {
        return item === 0 ? item : -item;
      });
    });
  }

  //returns a transposed matrix
  static getTranspose(matrix) {
    //validate
    this.#validate(matrix);

    const result = [];

    for (let i = 0; i < matrix[0].length; i++) {
      const row = [];
      for (let j = 0; j < matrix.length; j++) {
        row.push(matrix[j][i]);
      }
      result.push(row);
    }

    return result;
  }

  //return algebraic complement for a specific row and column
  static getAlgebraicComplement(matrix, numRow, numColumn) {
    //validate
    this.#validate(matrix);
    this.#validateSquare(matrix);
    this.#validateNaturalNumber(numRow, numColumn);

    if (matrix.length <= 1)
      throw new Error(
        'Invalid argument: the matrix dimension must be greater than 1.'
      );

    if (
      numRow < 1 ||
      numRow > matrix.length ||
      numColumn < 1 ||
      numColumn > matrix.length
    )
      throw new Error(
        `Invalid argument: row index and column index must be number greater than 0 and less than ${
          matrix.length + 1
        }.`
      );

    const subMatrix = this.#getSubMatrix(matrix, [numRow - 1], [numColumn - 1]);
    const det = this.#det(subMatrix);

    return fixed((-1) ** (numRow + numColumn) * det);
  }

  //returns a matrix filled with algebraic complements for the specified column and row
  static getMatrixOfAlgebraicComplements(matrix) {
    return matrix.map((row, rowIndex) => {
      return row.map((_, index) => {
        return this.getAlgebraicComplement(matrix, rowIndex + 1, index + 1);
      });
    });
  }

  //return a invertible matrix
  static getInvertibleMatrix(matrix) {
    const det = this.getDeterminant(matrix);

    if (det === 0) return false;

    const matrixOfAlgebraicComplements = this.getMatrixOfAlgebraicComplements(
      matrix
    );
    const transposeAC = this.getTranspose(matrixOfAlgebraicComplements);
    return this.multiplyByNumber(transposeAC, 1 / det);
  }
}

module.exports = Matrix;
