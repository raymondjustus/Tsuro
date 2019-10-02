const Parser = require('./Parser');
const sortItems = require('./sortItems');

/**
 * Parses the given input and sorts the parsed
 * items in the order denoted by the flag.
 *
 * @param {string} input the user's input to be
 * parsed and sorted
 * @param {string} flag the passed flag
 * @returns {object[]} the parsed sorted items
 */
const getSortedItems = (input, flag) => {
  const parser = new Parser();
  const items = parser.parse(input);
  const sortedItems = sortItems(items, flag);
  return sortedItems;
};

module.exports = getSortedItems;
