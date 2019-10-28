/**
 * Creates a message to send to STDOUT as a stringified
 * JSON array.
 *
 * @param  {...string} messages the message parts
 * to send as an array
 */
const getMessage = (...messages) => {
  console.log(JSON.stringify(messages));
};

module.exports = getMessage;
