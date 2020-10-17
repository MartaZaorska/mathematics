const FORMULA_SIGNS = ["r", "(", ")", "^", "*", "/", "+", "-"];

const FORMULA_NUMBERS = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "x"];

const FORMULA_ELEMENTS = [...FORMULA_SIGNS, ...FORMULA_NUMBERS];

const FORMULA_RULES = {
  "r": {
    before: ["+", "-", "*", "/", "("],
    after: ["number", "x", "("]
  },
  "^": {
    before: ["number", "x", ")"],
    after: ["number", "x", "("]
  },
  "*": {
    before: ["number", ")", "x"],
    after: ["number", "(", "r", "x"]
  },
  "/": {
    before: ["number", ")", "x"],
    after: ["number", "(", "r", "x"]
  },
  "+": {
    before: ["number", ")", "(", "x"],
    after: ["number", "(", "r", "x"]
  },
  "-": {
    before: ["number", ")", "(", "x"],
    after: ["number", "(", "r", "x"]
  },
  "(": {
    before: ["+", "-", "*", "/", "(", "r", "^"],
    after: ["number", "+", "-", "r", "x", "("]
  },
  ")": {
    before: ["number", "x", ")"],
    after: ["^", "/", "*", "+", "-", ")"]
  },
  "x": {
    before: ["+", "-", "*", "/", "(", "r", "^"],
    after: ["^", ")", "+", "-", "*", "/"]
  },
  "number": {
    before: ["+", "-", "*", "/", "(", "^", "r"],
    after: ["+", "-", "*", "/", ")", "^"]
  },
  "start": {
    elements: ["-", "(", "x", "number", "r"]
  },
  "end": {
    elements: ["number", "x", ")"]
  }
};

module.exports = {
  FORMULA_RULES,
  FORMULA_ELEMENTS,
  FORMULA_NUMBERS,
  FORMULA_SIGNS
};