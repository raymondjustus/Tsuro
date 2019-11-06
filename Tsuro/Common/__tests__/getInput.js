const getMessage = require('../../3/src/getMessage');
const Ref = require('../../3/src/Ref');

/**
 * Returns an event handler for handling new data from STDIN.
 *
 * @param {Ref} inputRef a reference to the current accumulated
 * user input
 * @returns {function} the `data` event handler
 */
const onData = inputRef => data => {
  inputRef.set(input => `${input}${data.trim()}`);
};

/**
 * Returns an event handler for handling an `end` from STDIN.
 *
 * @param {Ref} inputRef a reference to the current accumulated
 * user input
 * @param {function} resolve a callback function to call with
 * the final data
 * @returns {function} the `end` event handler
 */
const onEnd = (inputRef, resolve) => () => {
  const text = inputRef.get();
  try {
    const json = JSON.parse(inputRef.get());
    resolve(json);
  } catch (err) {
    console.log(getMessage('Invalid JSON ', text));
  }
};

/**
 * Initializes STDIN event handlers, and retrieves input
 * from them.
 *
 * @returns {Promise} a promise that will resolve on end
 * of input with the final data
 */
const getInput = () =>
  new Promise(resolve => {
    const inputRef = new Ref();

    process.stdin.setEncoding('utf8');

    process.stdin.on('data', onData(inputRef));

    process.stdin.on('end', onEnd(inputRef, resolve));
  });

module.exports = getInput;
