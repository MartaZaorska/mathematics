const {FORMULA_RULES, FORMULA_ELEMENTS, FORMULA_SIGNS} = require("./constants");
const {prepareNumber, replaceInArray} = require("./helper");

class MathFunction {
  constructor(formula){
    this.formula = this.createFormula(formula);
  }

  createFormula(formula){
    //create array, delete empty space
    let formulaArray = formula.split("").filter(item => item !== " ");
    formulaArray.unshift("(");
    formulaArray.push(")");

    //find invalid sign
    const invalidSign = formulaArray.find(item => {
      return FORMULA_ELEMENTS.indexOf(item) < 0 ? true : false;
    });

    if(invalidSign){
      throw new Error(`Invalid sign "${invalidSign}" in a mathematical formula.`);
    }

    //find numbers in formula, change numbers to float type
    formulaArray = this.findNumbers(formulaArray);

    //math function validation
    return this.checkFunction(formulaArray); 
  }

  findNumbers(formulaArray){
    let formula = [...formulaArray];

    //find the index of the first char of a number
    let startIndex = formula.findIndex(item => item.charCodeAt(0) >= 48 && item.charCodeAt(0) <= 57);

    while(startIndex >= 0){
      let endIndex = formula.slice(startIndex).findIndex(item => FORMULA_SIGNS.indexOf(item) >= 0);

      if(endIndex < 0) throw new Error("Invalid mathematical formula: incorrect number.");
          
      endIndex += startIndex;

      let number = formula.slice(startIndex, endIndex).join("");
      number = prepareNumber(number);
      
      if(number == "") throw new Error("Invalid mathematical formula: incorrect number.");

      //converting in an array to a number of the float type
      number = parseFloat(number);
      formula = replaceInArray(formula, startIndex, endIndex - 1, number);

      //update startIndex (find new number (sign))
      startIndex = formula.findIndex(item => typeof item === "string" && item.charCodeAt(0) >= 48 && item.charCodeAt(0) <= 57);
    }

    return formula;
  }

  checkFunction(formula){

  }
}

module.exports = MathFunction;