class Matrix {
  //private methods

  //validate arguments
  static #validate = (...data) => {
    if(data.some(item => !item || !Array.isArray(item))) throw new Error("Invalid argument: the matrix must be an array.");
    data.forEach(item => this.#validateMatrix(item));
  }

  //validate single matrix
  static #validateMatrix = (matrix) => { 
    if(matrix.some(item => !Array.isArray(item))) throw new Error("Invalid argument: the matrix must be an array of array/s. ");

    const rowLength = matrix[0].length;

    matrix.forEach((item) => {
      if(item.some(element => typeof element !== "number")) throw new Error("Invalid argument: the row of the matrix is an array of numbers.");

      if(item.length !== rowLength) throw new Error("Invalid argument: the rows in the matrix must have the same number of elements.");
    });
  }

  //checks if the matrices are of the same dimension
  static #validateDimension = (...data) => {
    const columnLength = data[0].length;
    const rowLength = data[0][0].length;
    data.forEach(item => {
      if(item.length !== columnLength || item[0].length !== rowLength) throw new Error("Invalid argument: the matrices must be of the same dimension.");
    });
  }

  //check if the matrix is the square matrix
  static #validateSquare = (...data) => {
    data.forEach(item => {
      if(!this.isSquare(item)) throw new Error("Invalid argument: matrix must be the square matrix.");
    });
  }

  //validate natural number
  static #validateNaturalNumber = (...data) => {
    data.forEach(item => {
      if(typeof item !== 'number' || item < 0 || Math.floor(item) !== item || item === Infinity) throw new Error("Invalid argument: required natural number.");
    });
  }

  //validate array index
  static #validateIndex = (arrayLength,...data) => {
    data.forEach(item => {
      this.#validateNaturalNumber(item);
      if(item < 0 || item >= arrayLength) throw new Error(`Invalid arguments: indexes must be numbers greater than 0 and less than ${arrayLength + 1}`);
    });
  }

  //public methods

  static add(matrixA, matrixB){
    //validate
    this.#validate(matrixA, matrixB);
    this.#validateDimension(matrixA,matrixB);

    return matrixA.map((row, indexRow) => {
      return row.map((item, index) => item + matrixB[indexRow][index]);
    });
  }

  static subtract(matrixA, matrixB){
    //validate
    this.#validate(matrixA, matrixB);
    this.#validateDimension(matrixA, matrixB);

    return matrixA.map((row, indexRow) => {
      return row.map((item, index) => item - matrixB[indexRow][index]);
    });
  }

  static multiplyByNumber(matrixA, value){
    //validate
    this.#validate(matrixA);

    //validate second argument
    if(typeof value !== 'number') throw new Error("Invalid argument: the second argument must be a number.");

    return matrixA.map((row) => {
      return row.map(item => item * value);
    });
  }

  static multiply(matrixA, matrixB){
    //validate
    this.#validate(matrixA, matrixB);

    if(matrixA[0].length !== matrixB.length) throw new Error("Invalid argument: matrixA must have the same number of columns as matrixB of rows.");

    const result = [];
    
    matrixA.forEach((row, indexRow) => {
      result[indexRow] = [];
      for(let i = 0; i < matrixB[0].length; i++){
        let value = 0;
        row.forEach((item, index) => {
          value += item * matrixB[index][i];
        });
        result[indexRow][i] = value;
      }
    });

    return result;
  }

  static switchColumns(matrix, indexCol1, indexCol2){
    const i1 = indexCol1 - 1;
    const i2 = indexCol2 - 1;

    this.#validate(matrix);
    this.#validateIndex(matrix.length, i1, i2);

    return matrix.map((row, rowIndex) => {
      const item1 = matrix[rowIndex][i1];
      row[i1] = row[i2];
      row[i2] = item1;
      return row;
    });
  }

  static switchRows(matrix, indexRow1, indexRow2){
    const i1 = indexRow1 - 1;
    const i2 = indexRow2 - 1;

    this.#validate(matrix);
    this.#validateIndex(matrix.length, i1, i2);

    const tmpRow1 = Array.from(matrix[i1]);
    matrix[i1] = Array.from(matrix[i2]);
    matrix[i2] = tmpRow1;
    return matrix;
  }

  static multiplyColumn(matrix, indexColumn, value){
    const i = indexColumn - 1;

    this.#validate(matrix);
    this.#validateIndex(matrix.length, i);

    if(typeof value !== "number" || value === 0) throw new Error("Invalid argument: value must be number other than 0");
  
    return matrix.map((row) => {
      row[i] *= value;
      return row;
    });
  }

  static multiplyRow(matrix, indexRow, value){
    const i = indexRow - 1;

    this.#validate(matrix);
    this.#validateIndex(matrix.length, i);

    if(typeof value !== "number" || value === 0) throw new Error("Invalid argument: value must be number other than 0");

    matrix[i].forEach((_, index) => {
      matrix[i][index] *= value;
    });

    return matrix;
  }

  static addColumnToColumn(matrix, indexCol, indexAddCol, value = 1){
    const i = indexCol - 1;
    const iA = indexAddCol - 1;

    this.#validate(matrix);
    this.#validateIndex(matrix.length, i, iA);
    
    if(typeof value !== 'number' || value === 0) throw new Error("Invalid argument: value must be number other than 0");

    return matrix.map((row) => {
      row[i] += (value*row[iA]);
      return row;
    });
  }

  static subtractColFromCol(matrix, indexCol, indexSubtractCol, value = 1){
    if(typeof value !== 'number' || value === 0) throw new Error("Invalid argument: value must be number other than 0");

    return this.addColToCol(matrix, indexCol, indexSubtractCol, -value);
  }

  static addRowToRow(matrix, indexRow, indexAddRow, value = 1){
    const i = indexRow - 1;
    const iA = indexAddRow - 1;

    this.#validate(matrix);
    this.#validateIndex(matrix.length, i, iA);

    if(typeof value !== 'number' || value === 0) throw new Error("Invalid argument: value must be number other than 0");

    matrix[i].forEach((_, index) => {
      matrix[i][index] += (value * matrix[iA][index]);
    });

    return matrix;
  }

  static subtractRowFromRow(matrix, indexRow, indexAddRow, value = 1){
    if(typeof value !== 'number' || value === 0) throw new Error("Invalid argument: value must be number other than 0");

    return this.addRowToRow(matrix, indexRow, indexAddRow, -value);
  }

  static isEqual(matrixA, matrixB){
    //validate
    this.#validate(matrixA, matrixB);
    this.#validateDimension(matrixA, matrixB);

    return matrixA.every((row, rowIndex) => {
      return row.every((item, index) => {
        return item === matrixB[rowIndex][index];
      });
    });
  }

  static isSquare(matrix){
    //validate
    this.#validate(matrix);

    return matrix.length === matrix[0].length;
  }

  static isZero(matrix){
    //validate
    this.#validate(matrix);

    return matrix.every(row => {
      return row.every(item => item === 0);
    });
  }

  static isLowerTriangular(matrix){
    //validate
    this.#validate(matrix);
    this.#validateSquare(matrix);

    if(matrix.length === 1) return true;

    let isLowerTriangular = true;
    let i = 1;
    while(i < matrix.length && isLowerTriangular){
      let j = 0;
      while(j < i && isLowerTriangular){
        if(matrix[i][j] !== 0) isLowerTriangular = false;
        ++j;
      }
      ++i;
    }

    return isLowerTriangular;
  }

  static isUpperTriangular(matrix){
    //validate
    this.#validate(matrix);
    this.#validateSquare(matrix);

    if(matrix.length === 1) return true;

    let isUpperTriangular = true;
    let i = 0;
    while(i < matrix.length - 1 && isUpperTriangular){
      let j = i + 1;
      while(j < matrix.length && isUpperTriangular){
        if(matrix[i][j] !== 0) isUpperTriangular = false;
        ++j;
      }
      ++i;
    }

    return isUpperTriangular;
  }

  static isTriangular(matrix){
    return this.isLowerTriangular(matrix) || this.isUpperTriangular(matrix);
  }

  static isDiagonal(matrix){
    //validate
    this.#validate(matrix);

    if(matrix.length === 1) return true;

    return this.isUpperTriangular(matrix) && this.isLowerTriangular(matrix);
  }
}

module.exports = Matrix;