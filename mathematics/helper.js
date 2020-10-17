const prepareNumber = (value) => {
  const tmp = value.replace(",", ".");
  return checkNumber(tmp) ? tmp : "";
};

const checkNumber = (value) => {
  return /^\d*\.?\d*$/.test(value);
};

const replaceInArray = (array, startIndex, endIndex, value) => {
  const tab1 = array.slice(0, startIndex);
  const tab2 = array.slice(endIndex + 1);
  tab1.push(value);
  return tab1.concat(tab2);
}

module.exports = {
  prepareNumber, checkNumber, replaceInArray
}