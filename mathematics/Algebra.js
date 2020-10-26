class Algebra {
  //private methods
  static #validateNaturalNumber = (...data) => {
    data.forEach(item => {
      if(typeof item !== 'number' || item < 0 || Math.floor(item) !== item || item === Infinity) throw new Error("");
    });
  }

  static #calcFactorial = (n, m = 1) => {
    if(n <= 1) return m * 1;
    const result = n * m;
    return this.#calcFactorial(n-1, result);
  }
  
  //public methods
  static factorial(n){
    this.#validateNaturalNumber(n);
    return this.#calcFactorial(n);
  }
}

module.exports = Algebra;