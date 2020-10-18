const {FORMULA_RULES, FORMULA_ELEMENTS, FORMULA_SIGNS} = require("./constants");
const {prepareNumber, replaceInArray} = require("./helper");

class MathEquation {
  constructor(formula){
    this.changeFormula(formula);
  }

  changeFormula(formula){
    if(typeof formula !== 'string' || formula.length === 0) throw new Error("Invalid parameter: formula must be of type string (not empty).");
    this.formula = this.createFormula(formula);
  }

  createFormula(formula){
    //create array, delete empty space
    let formulaArray = formula.split("").filter(item => item !== " ");

    //find invalid sign
    const invalidSign = formulaArray.find(item => {
      return FORMULA_ELEMENTS.indexOf(item) < 0 ? true : false;
    });

    if(invalidSign){
      throw new Error(`Invalid sign "${invalidSign}" in a mathematical formula.`);
    }

    //find numbers in formula, change numbers to float type
    formulaArray = this.findNumbers(formulaArray);

    //math formula validation
    return this.checkFormula(formulaArray);
  }

  findNumbers(formulaArray){
    let formula = ["(", ...formulaArray, ")"];
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

      //update startIndex (find new number)
      startIndex = formula.findIndex(item => typeof item === "string" && item.charCodeAt(0) >= 48 && item.charCodeAt(0) <= 57);
    }

    return formula.slice(1, formula.length - 1);
  }

  checkFormula(formula){
    //check brackets
    this.checkBrackets(formula);

    //equation with single argument
    if(formula.length === 1){
      if(typeof formula[0] === "number" || formula[0] === "x") return formula;

      throw new Error('Invalid mathematical formula: single argument must be a number or "x".');
    }

    //equation with multiple arguments

    //check first element
    const firstElement = this.getEquationElement(formula[0]);
    if(FORMULA_RULES["start"].elements.indexOf(firstElement) < 0) throw new Error(`Invalid mathematical formula: incorrect first element "${firstElement}".`);

    //check last element
    const lastElement = this.getEquationElement(formula[formula.length - 1]);
    if(FORMULA_RULES["end"].elements.indexOf(lastElement) < 0) throw new Error(`Invalid mathematical formula: incorrect last element "${lastElement}".`)

    //check the rest of the items
    for(let i = 0; i < formula.length - 1; i++){
      const element = this.getEquationElement(formula[i]);
      const nextElement = this.getEquationElement(formula[i+1]);

      if(FORMULA_RULES[element].elements.indexOf(nextElement) < 0) throw new Error(`Invalid mathematical formula: incorrect elements "${formula[i]}${formula[i+1]}".`);
    }

    return formula;
  }

  checkBrackets(formula){
    let brackets = 0;
    formula.forEach(item => {
      if(item === "("){
        brackets += 1;
      }else if(item === ")"){
        brackets -= 1;
      }

      if(brackets < 0) throw new Error("Invalid mathematical formula: incorrect brackets.")
    }); 

    if(brackets !== 0) throw new Error("Invalid mathematical formula: incorrect brackets.");
  }

  getEquationElement(element){
    return typeof element === "number" ? "number" : element;
  }

  getY(x){
    //check the value of x
    if(typeof x !== 'number') throw new Error('Invalid data type: "x" must be a number');

    //replace x 
    let formula = ["(", ...this.formula, ")"].map(item => item === "x" ? x : item);
    
    //calculate each bracket (start with inner brackets)
    let closeBracketsIndex = formula.indexOf(")");

    while(closeBracketsIndex > 0){
      //look for opening bracket
      const openBracketsIndex = formula.slice(0, closeBracketsIndex).lastIndexOf("(");
      //get expression between the brackets
      const betweenBrackets = formula.slice(openBracketsIndex + 1, closeBracketsIndex);
      //get the value for the expression
      const valueBrackets = this.getValue(betweenBrackets);
      //update math equation (convert expression between brackets into value)
      formula = replaceInArray(formula, openBracketsIndex, closeBracketsIndex, valueBrackets);
      //find next close brackets
      closeBracketsIndex = formula.indexOf(")");
    }

    return formula[0];
  }

  getValue(expression){
    //the sequence of operations
    const operations = ['r', '^', '/' , '*', '-', '+'];
    let result = [...expression];
    let operationIndex = 0;

    //loop through all operations
    while(operationIndex < operations.length){

      const index = result.indexOf(operations[operationIndex]);

      if(index < 0){
        operationIndex += 1;
        continue;
      }
       
      const operation = operations[operationIndex];
      const value1 = index === 0 || operation === "r" ? result[index + 1] : result[index - 1];
      const value2 = index === 0 || operation === "r" ? undefined : result[index + 1];
      
      const value = this.calculateExpression(operation, value1, value2);

      result = !value2 ? replaceInArray(result, index, index + 1, value) : replaceInArray(result, index - 1, index + 1, value);
    }


    if(result.length === 1) return result[0];
  }  

  calculateExpression(operation, value1, value2 = undefined){
    switch(operation){
      case 'r':
        if(value1 < 0) throw new Error("Illegal math operations: the square root of negative numbers is not allowed.");
        return Math.sqrt(value1);
      case '^':
        return value1 ** value2;
      case '/':
        if(value2 === 0) throw new Error("Illegal math operations: divided by 0 is not allowed.");
        return value1 / value2;
      case '*':
        return value1 * value2;
      case '-':
        return !value2 ? -value1 : value1 - value2;
      case '+':
        return value1 + value2;
      default:
        throw new Error(`Illegal math operations: "${operation}" operation does not exist`);
    }
  }
}

module.exports = MathEquation;