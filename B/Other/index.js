const Parser = require('./Parser');
const getFlag = require('./getFlag');
const getInput = require('./getInput');
const printItems = require('./printItems');
const sortItems = require('./sortItems');

/**
 * Main script function. Reads input from stdin, parses it
 * into valid JSON, sorts it based on a given flag, and
 * prints it to stdout.
 */
const main = () => {
  try {
    const flag = getFlag(process.argv);
    getInput().then(input => {
      const parser = new Parser();
      const items = parser.parse(input);
      const sortedItems = sortItems(items, flag);
      printItems(sortedItems);
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    process.exit(1);
  }
};

module.exports = main;
