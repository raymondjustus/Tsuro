const parseArguments = require('./parseArguments');

const main = () => {
  try {
    const { ipAddress, port, username } = parseArguments(process.argv);
    console.log(ipAddress, port, username);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = main;
