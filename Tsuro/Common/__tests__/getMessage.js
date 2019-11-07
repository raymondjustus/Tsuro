/**
 * Creates a message to send to STDOUT as a stringified
 * JSON array.
 *
 * @param  {...string} messages the message parts
 * to send as an array
 * @returns {string} the stringified JSON array of messages
 */
const getMessage = (...messages) => JSON.stringify(messages);

module.exports = getMessage;
