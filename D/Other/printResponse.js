/**
 * Logs a response from the server to the client.
 *
 * @param {...string} response a collection of responses
 * to send as a stringified array
 */
const printResponse = (...response) => {
  console.log(JSON.stringify(response));
};

module.exports = printResponse;
