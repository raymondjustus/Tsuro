/**
 * Prints a message to STDOUT in a stringified
 * JSON array.
 *
 * @param  {...string} messages the message parts
 * to send as an array
 */
const printMessage = (...messages) => {
  console.log(JSON.stringify(messages));
};

module.exports = printMessage;
