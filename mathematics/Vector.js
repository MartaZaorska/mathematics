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
  static create(a, b) {
    //validate arguments
    this.#validate(a, b);

    return b.map((item, index) => fixed(item - a[index]));
  }

  static getNorm(v) {
    //validate argument
    this.#validate(v);

    //one-dimensional vector
    if (v.length === 1) return Math.abs(fixed(v[1] - v[0]));
    //more than one-dimensional vector
    return fixed(Math.sqrt(v.reduce((prev, curr) => prev + curr ** 2, 0)));
  }

  static getLength(v) {
    return this.getNorm(v);
  }

  static getOpposite(v) {
    //validate argument
    this.#validate(v);

    return v.map((item) => {
      return item === 0 ? 0 : -item;
    });
  }

  static multiply(v, x) {
    //validate first argument
    this.#validate(v);

    //validate second argument
    if (typeof x !== 'number')
      throw new Error('Invalid argument: x must be a number.');

    return v.map((item) => fixed(item * x));
  }

  static add(v1, v2) {
    //validate arguments
    this.#validate(v1, v2);

    return v1.map((item, index) => fixed(item + v2[index]));
  }

  static subtract(v1, v2) {
    //validate arguments
    this.#validate(v1, v2);

    return v1.map((item, index) => fixed(item - v2[index]));
  }

  static scalarProduct(v1, v2) {
    //validate arguments
    this.#validate(v1, v2);

    return v1
      .map((item, index) => item * v2[index])
      .reduce((prev, curr) => fixed(prev + curr), 0);
  }

  static isOrthogonal(v1, v2) {
    return this.scalarProduct(v1, v2) === 0 ? true : false;
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

  static getAngle(v1, v2) {
    const norms = this.getNorm(v1) * this.getNorm(v2);

    if (norms === 0)
      throw new Error('Invalid operation: divide by zero is forbidden.');

    const cos = this.scalarProduct(v1, v2) / norms;
    return fixed((Math.acos(cos) / Math.PI) * 180, 1);
  }
}

module.exports = Vector;
