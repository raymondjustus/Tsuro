/**
 * Gets the first non-null value returned from an array, given
 * a filter function.
 *
 * @param {function} getValueFromItem the function that returns
 * a value or null, given an array item
 * @returns {any} the first non-null value returned from the
 * filter
 */
Array.prototype.first = function(getValueFromItem) {
  let firstValue = null;
  this.some(value => {
    const returnedValue = getValueFromItem(value);
    if (returnedValue !== null) {
      firstValue = returnedValue;
      return true;
    }
    return false;
  });
  return firstValue;
};

Object.prototype.entries = function(object) {
  return Object.keys(object).map(key => object[key]);
};
