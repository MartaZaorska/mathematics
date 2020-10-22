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
}

module.exports = Vector;