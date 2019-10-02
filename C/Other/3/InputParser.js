const { ITEM_TYPES } = require("./constants");

/**
 * Map for starting delimiter to the valid type key.
 */
const ITEM_TYPES_DELIMITER_MAP = Object.keys(ITEM_TYPES).reduce((acc, key) => {
  const delimiter = ITEM_TYPES[key].delimiters.start;
  acc = Object.assign(acc, {
    [delimiter]: key
  });
  return acc;
}, {});

class InputParser {
  /**
   * Initializes a new Parser object with default values.
   */
  constructor() {
    // The current item type being parsed
    this.itemType = null;

    // The starting index of a type
    this.startIdx = -1;

    // The current structure level (for objects and arrays)
    this.itemLevel = -1;
  }

  /**
   * Checks whether the given character ends the outermost array
   * or object type from the given text.
   *
   * @param {string} char the character to check
   * @returns {boolean} whether the given character ends an
   * array or object type from the given text
   */
  _doesCharEndOutermostObjectOrArray(char) {
    const { start, end } = ITEM_TYPES[this.itemType].delimiters;
    if (char === start) {
      this.itemLevel += 1;
    } else if (char === end) {
      this.itemLevel -= 1;
      if (this.itemLevel < 0) {
        return true;
      }
    }
    return false;
  }

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
  _doesCharEndItem(char, prevChar) {
    if (this.itemType === ITEM_TYPES.string.key) {
      return this._doesCharEndString(char, prevChar);
    } else if (
      this.itemType === ITEM_TYPES.object.key ||
      this.itemType === ITEM_TYPES.array.key
    ) {
      return this._doesCharEndOutermostObjectOrArray(char);
    } else {
      throw "JSON type not valid. Please pass only strings, arrays, or objects.";
    }
  }

  /**
   * Resets the parser variables to be able to start
   * checking for a new typed item.
   */
  _reset() {
    this.startIdx = -1;
    this.itemLevel = -1;
    this.itemType = null;
  }

  /**
   * Parses the input from the user into an array of
   * strings, arrays, and objects.
   *
   * @param {string} input the input from the user
   * @returns {any[]} the parsed input
   */
  parse(input) {
    const items = [];

    const text = input.trim();
    const chars = text.split("");

    chars.forEach((char, i) => {
      if (!this.itemType) {
        const foundType = ITEM_TYPES_DELIMITER_MAP[char];
        if (foundType) {
          this.itemType = foundType;
          this.startIdx = i;
          this.itemLevel += 1;
        }
      } else if (this._doesCharEndItem(char, chars[i - 1])) {
        const item = text.slice(this.startIdx, i + 1);
        items.push(JSON.parse(item));
        this._reset();
      }
    });

    if (this.startIdx >= 0) {
      throw "Unable to parse given value. Check for closing brackets or quotations.";
    }

    this._reset();
    return items;
  }
}

module.exports = InputParser;
