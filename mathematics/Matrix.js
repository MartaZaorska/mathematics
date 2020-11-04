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
}

module.exports = Matrix;