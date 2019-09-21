const { VALID_TYPES } = require('./constants');

const VALID_TYPES_ARR = Object.values(VALID_TYPES);

/**
 * Parses the input from the user into an array of
 * strings, arrays, and objects.
 *
 * @param {string} input the input from the user
 * @returns {any[]} the parsed input
 */
const parseInput = input => {
  const parsedItems = [];

  const text = input.trim();
  const chars = text.split('');

  let start = -1;
  let level = -1;
  let type = null;

  chars.forEach((char, i) => {
    let hasReachedEnd = false;
    if (!type) {
      const foundType = VALID_TYPES_ARR.find(({ delimiters }) => delimiters.start === char);
      if (foundType) {
        type = foundType.key;
        start = i;
        level += 1;
      }
    } else if (type === VALID_TYPES.string.key) {
      if (char === VALID_TYPES.string.delimiters.end && chars[i - 1] !== '\\') {
        hasReachedEnd = true;
      }
    } else {
      const { start, end } = VALID_TYPES[type].delimiters;
      if (char === start) {
        level += 1;
      } else if (char === end) {
        level -= 1;
        if (level < 0) {
          hasReachedEnd = true;
        }
      }
    }

    if (hasReachedEnd) {
      const item = text.slice(start, i + 1);
      parsedItems.push(JSON.parse(item));
      start = -1;
      level = -1;
      type = null;
    }
  });

  if (start >= 0) {
    throw 'Unable to parse given value. Check for closing brackets or quotations.';
  }

  console.log(parsedItems);

  return parsedItems;
};

module.exports = parseInput;
