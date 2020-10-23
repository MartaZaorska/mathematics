const fixed = require("./helper");

class Vector {
  //private method
  static #validate = (...elements) => {
    const elementLength = elements[0].length;

    elements.forEach(element => {

      if(!element) throw new Error(`Invalid argument: ${elements.length} arrays are required.`);

      if(!Array.isArray(element) || element.length === 0 || element.length >= 4) throw new Error("Invalid vector: the argument must be an array of 1, 2 or 3 elements.");

      if(element.length !== elementLength) throw new Error("Invalid vector: arguments must be an array of the same length.");

      if(element.some(item => typeof item !== "number")) throw new Error("Invalid vector: the array must contain numbers.");

    }); 
  }

  //public methods
  static createVector(pointA, pointB){
    //validate arguments
    this.#validate(pointA, pointB);

    return pointB.map((item, index) => fixed(item - pointA[index]));
  }

  static getLengthVector(vector){
    //validate argument
    this.#validate(vector);
    
    //one-dimensional vector
    if(vector.length === 1) return Math.abs(fixed(vector[1] - vector[0]));
    //two- and three-dimensional vector
    return fixed(Math.sqrt(vector.reduce((prev, curr) => prev + curr ** 2, 0)));
  }

  static getOppositeVector(vector){
    //validate argument
    this.#validate(vector);

    return vector.map(item => {
      return item === 0 ? 0 : -item;
    });
  }

  static getCenterPointVector(pointA, pointB){
    //validate arguments
    this.#validate(pointA, pointB);
    
    return pointA.map((item, index) => fixed((item + pointB[index]) / 2));
  }

  static multiplyVector(vector, value){
    //validate first argument
    this.#validate(vector);

    //validate second argument
    if(typeof value !== "number") throw new Error("Invalid argument: value must be a number.");

    return vector.map(item => fixed(item * value));
  }

  static addVectors(vector1, vector2){
    //validate arguments
    this.#validate(vector1, vector2);

    return vector1.map((item, index) => fixed(item + vector2[index]));
  }

  static subtractVectors(vector1, vector2){
    //validate arguments
    this.#validate(vector1, vector2);

    return vector1.map((item, index) => fixed(item - vector2[index]));
  }

  static crossProduct(vector1, vector2){
    //validate arguments
    this.#validate(vector1, vector2);

    //check if the vectors are three-dimensional
    if(vector1.length !== 3)  throw new Error("Invalid argument: vectors must be an array containing three numbers.");

    return [
      fixed(vector1[1] * vector2[2] - vector1[2] * vector2[1]),
      fixed(-(vector1[0] * vector2[2] - vector1[2] * vector2[0])),
      fixed(vector1[0] * vector2[1] - vector1[1] * vector2[0])
    ];
  }

  static scalarProduct(vector1, vector2){
    //validate arguments
    this.#validate(vector1, vector2);

    return vector1.map((item, index) => item * vector2[index]).reduce((prev, curr) => fixed(prev + curr), 0);
  }


  static tripleProduct(vector1, vector2, vector3){
    const crossProduct = this.crossProduct(vector1, vector2);
    return this.scalarProduct(crossProduct, vector3);
  }
}

module.exports = Vector;