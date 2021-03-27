const { fixed } = require('./helper');

class Vector {
  //private method
  static #validate = (...elements) => {
    const elementLength = elements && elements[0] && elements[0].length;

    elements.forEach((element) => {
      if (!element) throw new Error(`Invalid vector: arguments are required.`);

      if (!Array.isArray(element) || element.length === 0)
        throw new Error(
          'Invalid vector: the argument must be an array (not empty).'
        );

      if (element.length !== elementLength)
        throw new Error(
          'Invalid vector: arguments must be an array of the same length.'
        );

      if (element.some((item) => typeof item !== 'number'))
        throw new Error('Invalid vector: the array must contain numbers.');
    });
  };

  //public methods
  static create(pointA, pointB) {
    //validate arguments
    this.#validate(pointA, pointB);

    return pointB.map((item, index) => fixed(item - pointA[index]));
  }

  static getNorm(vector) {
    //validate argument
    this.#validate(vector);

    //one-dimensional vector
    if (vector.length === 1) return Math.abs(fixed(vector[1] - vector[0]));
    //more than one-dimensional vector
    return fixed(Math.sqrt(vector.reduce((prev, curr) => prev + curr ** 2, 0)));
  }

  static getLength(vector) {
    return this.getNorm(vector);
  }

  static getOpposite(vector) {
    //validate argument
    this.#validate(vector);

    return vector.map((item) => {
      return item === 0 ? 0 : -item;
    });
  }

  static getCenterPoint(pointA, pointB) {
    //validate arguments
    this.#validate(pointA, pointB);

    return pointA.map((item, index) => fixed((item + pointB[index]) / 2));
  }

  static multiply(vector, value) {
    //validate first argument
    this.#validate(vector);

    //validate second argument
    if (typeof value !== 'number')
      throw new Error('Invalid argument: value must be a number.');

    return vector.map((item) => fixed(item * value));
  }

  static add(vector1, vector2) {
    //validate arguments
    this.#validate(vector1, vector2);

    return vector1.map((item, index) => fixed(item + vector2[index]));
  }

  static subtract(vector1, vector2) {
    //validate arguments
    this.#validate(vector1, vector2);

    return vector1.map((item, index) => fixed(item - vector2[index]));
  }

  static scalarProduct(vector1, vector2) {
    //validate arguments
    this.#validate(vector1, vector2);

    return vector1
      .map((item, index) => item * vector2[index])
      .reduce((prev, curr) => fixed(prev + curr), 0);
  }

  static isOrthogonal(vector1, vector2) {
    return this.scalarProduct(vector1, vector2) === 0 ? true : false;
  }

  static isOrthonormal(vector) {
    return fixed(this.getNorm(vector), 0) === 1 ? true : false;
  }

  static areOrthogonal(...vectors) {
    this.#validate(...vectors);
    let orthogonal = true;

    for (let i = 0; i < vectors.length - 1 && orthogonal; i++) {
      for (let j = i + 1; j < vectors.length && orthogonal; j++) {
        orthogonal = this.isOrthogonal(vectors[i], vectors[j]);
      }
    }

    return orthogonal;
  }

  static areOrthonormal(...vectors) {
    this.#validate(...vectors);
    let orthonormal = true;

    for (let i = 0; i < vectors.length && orthonormal; i++) {
      orthonormal = this.isOrthonormal(vectors[i]);
    }

    return orthonormal;
  }

  static getAngle(vector1, vector2) {
    const cos =
      this.scalarProduct(vector1, vector2) /
      (this.getNorm(vector1) * this.getNorm(vector2));
    return fixed((Math.acos(cos) / Math.PI) * 180, 1);
  }
}

module.exports = Vector;
