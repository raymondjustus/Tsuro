const getEndingPort = require('./getEndingPort');
const getInput = require('./getInput');
const printMessage = require('./printMessage');

/**
 * Responds to input from STDIN to return the ending port
 * for the specified starting port.
 */
const main = () => {
  getInput(json => {
    try {
      const [tileIndex, degrees, port] = json;
      getEndingPort(tileIndex, degrees, port);
    } catch (err) {
      printMessage('Invalid JSON', json);
    }
  });
};

module.exports = main;
