const { Socket } = require('net');

/**
 * Returns a promise that creates and connects a
 * server client to the given IP address and port.
 *
 * @param {string} ipAddress the IP address to
 * connect to
 * @param {string} port the port to connect to
 * @returns {Promise<Socket>} that resolves with the
 * client object, or rejects on error
 */
const getServerClient = (ipAddress, port) =>
  new Promise((resolve, reject) => {
    const client = new Socket();
    try {
      client.connect(port, ipAddress, () => {
        resolve(client);
      });
    } catch {
      reject();
    }
  });

module.exports = getServerClient;
