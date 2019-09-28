const getFlag = require('./getFlag');
const getInput = require('./getInput');
const getSortedItems = require('./getSortedItems');
const printItems = require('./printItems');

/**
 * Main script function. Reads input from stdin, parses it
 * into valid JSON, sorts it based on a given flag, and
 * prints it to stdout.
 */
const main = () => {
  try {
    const flag = getFlag(process.argv);
    getInput().then(input => {
      const items = getSortedItems(input, flag);
      printItems(items);
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    process.exit(1);
  }
};

module.exports = main;
