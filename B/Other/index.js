const Parser = require('./Parser');
const getFlag = require('./getFlag');
const getInput = require('./getInput');
const sortItems = require('./sortItems');

/**
 * Main script function. Reads input from stdin, parses it
 * into valid JSON, sorts it based on a given flag, and
 * logs it to stdout.
 */
const main = () => {
  try {
    const flag = getFlag(process.argv);
    getInput().then(input => {
      const parser = new Parser();
      const items = parser.parse(input);
      const sortedItems = sortItems(items, flag);
      console.log('------------------------------');
      sortedItems.forEach(item => console.log(JSON.stringify(item)));
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    process.exit(1);
  }
};

module.exports = main;
