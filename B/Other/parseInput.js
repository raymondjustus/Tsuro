const { VALID_TYPES } = require('./constants');

/**
 * Map for starting delimiter to the valid type key.
 */
const VALID_TYPES_DELIMITER_MAP = Object.keys(VALID_TYPES).reduce((acc, key) => {
  const delimiter = VALID_TYPES[key].delimiters.start;
  acc = Object.assign(acc, {
    [delimiter]: key,
  });
  return acc;
}, {});

/**
 * Parses the input from the user into an array of
 * strings, arrays, and objects.
 *
 * @param {string} input the input from the user
 * @returns {any[]} the parsed input
 */
const parseInput = input => {
  // The current item type being parsed
  let type = null;

  // The starting index of a type
  let startIdx = -1;

  // The current structure level (for objects and arrays)
  let level = -1;

  /**
   * Checks whether the given character ends a string type
   * from the given text.
   *
   * @param {string} char the character to check
   * @param {number} prevChar the previous character in the
   * sequence
   * @returns {boolean} whether the given character ends a
   * string type from the given text
   */
  const doesCharEndString = (char, prevChar) =>
    char === VALID_TYPES.string.delimiters.end && prevChar !== '\\';

  /**
   * Checks whether the given character ends an array or object
   * type from the given text.
   *
   * @param {*} char the character to check
   * @returns {boolean} whether the given character ends an
   * array or object type from the given text
   */
  const doesCharEndObjectOrArray = char => {
    const { start, end } = VALID_TYPES[type].delimiters;
    if (char === start) {
      level += 1;
    } else if (char === end) {
      level -= 1;
      if (level < 0) {
        return true;
      }
    }
    return false;
  };

  /**
   * Checks whether the given character ends a valid type
   * from the given text, based on the ending delimiter for
   * the type.
   *
   * @param {string} char the character to check
   * @param {number} prevChar the previous character in the
   * sequence
   * @returns {boolean} whether the given character ends a
   * valid type
   */
  const doesCharEndType = (char, prevChar) => {
    if (type === VALID_TYPES.string.key) {
      return doesCharEndString(char, prevChar);
    } else if (type === VALID_TYPES.object.key || type === VALID_TYPES.array.key) {
      return doesCharEndObjectOrArray(char);
    } else {
      throw 'JSON type not valid. Please pass only strings, arrays, or objects.';
    }
  };

  /**
   * Resets the parser variables to be able to start
   * checking for a new typed item.
   */
  const resetParser = () => {
    startIdx = -1;
    level = -1;
    type = null;
  };

  /**
   * Parses the input from the user into an array of
   * strings, arrays, and objects.
   *
   * @param {string} input the input from the user
   * @returns {any[]} the parsed input
   */
  const parse = input => {
    const items = [];

    const text = input.trim();
    const chars = text.split('');

    chars.forEach((char, i) => {
      if (!type) {
        const foundType = VALID_TYPES_DELIMITER_MAP[char];
        if (foundType) {
          type = foundType;
          startIdx = i;
          level += 1;
        }
      } else if (doesCharEndType(char, chars[i - 1])) {
        const item = text.slice(startIdx, i + 1);
        items.push(JSON.parse(item));

        resetParser();
      }
    });

    if (startIdx >= 0) {
      throw 'Unable to parse given value. Check for closing brackets or quotations.';
    }

    return items;
  };

  return parse(input);
};

module.exports = parseInput;
