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

  static symbolNewton(n, k) {
    this.#validateNaturalNumber(n,k);
    if(n < k) throw new Error("");

    const factorialN = this.#calcFactorial(n);
    const factorialK = this.#calcFactorial(k);
    const factorialNK = this.#calcFactorial(n - k);

    return parseInt(factorialN / (factorialK * factorialNK));
  }

  static binomialTheorem(n){
    this.#validateNaturalNumber(n);
    let result = `(a+b)^${n} = a^${n} + `;

    for(let k = 1; k < n; ++k){
      const symbolNewton = this.symbolNewton(n, k);
      result += `${symbolNewton}*`;
      result += n -k === 1 ? 'a*' : `a^${n-k}*`;
      result += k ===1 ? 'b + ' : `b^${k} + `;
    }

    result += `b^${n}`;

    return result;
  }
}

module.exports = Algebra;