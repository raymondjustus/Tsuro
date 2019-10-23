const printMessage = require('./printMessage');

/**
 * Returns an event handler for handling new data from STDIN.
 *
 * @param {function} onDataCallback a callback that handles
 * receiving data
 * @returns {function} the `data` event handler
 */
const onData = onDataCallback => data => {
  data.split('\n').forEach(line => {
    const text = line.trim();
    if (text.length) {
      try {
        const json = JSON.parse(line);
        onDataCallback(json);
      } catch (err) {
        printMessage('Invalid JSON ', data);
      }
    }
  });
};

/**
 * Initializes STDIN event handlers, and retrieves input
 * from them.
 *
 * @param {function} onDataCallback a callback that handles
 * receiving data
 * @returns {Promise} a promise that will resolve on end
 * of input with the final data
 */
const getInput = onDataCallback =>
  new Promise(resolve => {
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', onData(onDataCallback));

    process.stdin.on('end', resolve);
  });

module.exports = getInput;
