const getFlag = require('./getFlag');

const main = () => {
  try {
    const flag = getFlag(process.argv);
    console.log(`FLAG: ${flag}`);
  } catch (error) {
    console.log(`ERROR: ${error}`);
    process.exit(1);
  }
};

module.exports = main;
