const {MathEquation} = require("../mathematics/index");

test("Equation y = 2 for x = 0", () => {
  const equation = new MathEquation("2");
  expect(equation.getY(0)).toBe(2);
});

test("Equation y = (x^2 + 3) for x = 4", () => {
  const equation = new MathEquation("x^2 + 3");
  const result = 4 ** 2 + 3;
  expect(equation.getY(4)).toBe(result);
});

test("Equation y = (2^x + 3 / r(x^2 + 3) - (2*x - 3)^3) for x = 0.85", () => {
  const equation = new MathEquation('2^x + 3 / r(x^2 + 3) - (2*x - 3)^3');
  const result = 2 ** 0.85 + 3 / Math.sqrt(0.85**2 + 3) - (2*0.85 - 3)**3;
  expect(equation.getY(0.85)).toBe(result);
});

test("Equation y = (1 / (x + 1) * (x - 2.5)) for x = 0.5", () => {
  const equation = new MathEquation("1 / (x+1) * (x - 2.5)");
  const result = 1 / (0.5 +1) * (0.5 - 2.5);
  expect(equation.getY(0.5)).toBe(result);
});


// Errors
test("Error: formula is an empty string", () => {
  expect(() => {
    new MathEquation("");
  }).toThrow("Invalid argument: formula must be a non-empty string.");
});

test("Error: invalid sign", () => {
  expect(() => {
    new MathEquation('2.5*% + x * 3');
  }).toThrow('Invalid mathematical formula: incorrect sign "%".')
})

test("Error: incorrect number", () => {
  expect(() => {
    new MathEquation("2.5x + 3 * x");
  }).toThrow("Invalid mathematical formula: incorrect number.");
});

test("Error: equation with single argument", () => {
  expect(() => {
    new MathEquation("+");
  }).toThrow('Invalid mathematical formula: single argument must be a number or "x".');
});

test("Error: invalid first element", () => {
  expect(() => {
    new MathEquation("*2 + 3 ^ x");
  }).toThrow('Invalid mathematical formula: incorrect first element "*".');
});


test("Error: invalid last element", () => {
  expect(() => {
    new MathEquation("2 + 3 ^ x -");
  }).toThrow('Invalid mathematical formula: incorrect last element "-".');
});


test("Error: incorrect elements", () => {
  expect(() => {
    new MathEquation("2 + r^(3+x)");
  }).toThrow('Invalid mathematical formula: incorrect elements "r^".');
});

test("Error: incorrect brackets", () => {
  expect(() => {
    new MathEquation("(2+1)*3)");
  }).toThrow("Invalid mathematical formula: incorrect brackets.");
});

test("Error: the square root of negative numbers", () => {
  expect(() => {
    const equation = new MathEquation("r(15 - x)");
    equation.getY(16);
  }).toThrow("Illegal math operations: the square root of negative numbers is not allowed.");
});

test("Error: divided by 0", () => {
  expect(() => {
    const equation = new MathEquation("1 / (x - 2)");
    equation.getY(2);
  }).toThrow("Illegal math operations: divided by 0 is not allowed.");
});
