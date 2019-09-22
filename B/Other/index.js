const Parser = require('./Parser');
// const getFlag = require('./getFlag');
const getInput = require('./getInput');

const main = () => {
  try {
    // const flag = getFlag(process.argv);
    getInput().then(input => {
      console.log('---------');
      const parser = new Parser();
      const items = parser.parse(input);
      console.log(items);
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    process.exit(1);
  }
};

module.exports = main;
