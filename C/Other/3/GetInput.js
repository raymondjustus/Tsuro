const Ref = require("./Ref");

/**
 * Returns an event handler for handling new data from STDIN.
 *
 * @param {Ref} inputRef the input ref to update as new input
 * data streams in
 * @returns {function} the `data` event handler
 */
const onData = inputRef => data => {
  data = data.trim();
  inputRef.set(input => `${input}${data} `);
};

/**
 * Returns an event handler for end of STDIN input.
 *
 * @param {Ref} inputRef the input ref to fetch the
 * current value of
 * @param {function} resolve callback function to send
 * final input to
 * @returns the `end` event handler
 */
const onInputEnd = (inputRef, resolve) => () => {
  const input = inputRef.get();
  resolve(input);
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

    process.stdin.setEncoding("utf8");

    process.stdin.on("data", onData(inputRef));

    process.stdin.on("end", onInputEnd(inputRef, resolve));
  });

module.exports = getInput;
