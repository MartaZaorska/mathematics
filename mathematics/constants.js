const FORMULA_SIGNS = ['r', '(', ')', '^', '*', '/', '+', '-'];

const FORMULA_NUMBERS = [
  '.',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'x',
];

const FORMULA_ELEMENTS = [...FORMULA_SIGNS, ...FORMULA_NUMBERS];

const FORMULA_RULES = {
  r: {
    elements: ['number', 'x', '('],
  },
  '^': {
    elements: ['number', 'x', '('],
  },
  '*': {
    elements: ['number', '(', 'r', 'x'],
  },
  '/': {
    elements: ['number', '(', 'r', 'x'],
  },
  '+': {
    elements: ['number', '(', 'r', 'x'],
  },
  '-': {
    elements: ['number', '(', 'r', 'x'],
  },
  '(': {
    elements: ['number', '+', '-', 'r', 'x', '('],
  },
  ')': {
    elements: ['^', '/', '*', '+', '-', ')'],
  },
  x: {
    elements: ['^', ')', '+', '-', '*', '/'],
  },
  number: {
    elements: ['+', '-', '*', '/', ')', '^'],
  },
  start: {
    elements: ['-', '(', 'x', 'number', 'r'],
  },
  end: {
    elements: ['number', 'x', ')'],
  },
};

module.exports = {
  FORMULA_RULES,
  FORMULA_ELEMENTS,
  FORMULA_NUMBERS,
  FORMULA_SIGNS,
};
