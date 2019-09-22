// const getFlag = require('./getFlag');
const getInput = require('./getInput');
const parseInput = require('./parseInput');

const main = () => {
  try {
    // const flag = getFlag(process.argv);
    getInput().then(input => {
      console.log('---------');
      const items = parseInput(input);
      console.log(items);
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    process.exit(1);
  }
};

module.exports = main;
