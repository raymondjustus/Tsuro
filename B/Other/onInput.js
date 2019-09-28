const Parser = require('./Parser');
const printItems = require('./printItems');
const sortItems = require('./sortItems');

/**
 * Parses the given input and sorts the parsed
 * items in the order denoted by the flag, and
 * then prints it.
 *
 * @param {string} input the user's input to be
 * parsed and sorted
 * @param {string} flag the passed flag
 */
const onInput = (input, flag) => {
  const parser = new Parser();
  const items = parser.parse(input);
  const sortedItems = sortItems(items, flag);
  printItems(sortedItems);
};

module.exports = onInput;
