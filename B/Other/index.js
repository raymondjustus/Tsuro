const getFlag = require('./getFlag');
const getInput = require('./getInput');

const main = () => {
  try {
    const flag = getFlag(process.argv);
    getInput().then(input => {
      console.log('---------');
      console.log(`FLAG: ${flag}`);
      console.log(`INPUT: ${input}`);
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    process.exit(1);
  }
};

module.exports = main;
