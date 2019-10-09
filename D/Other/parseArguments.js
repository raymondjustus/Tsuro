const INDICES = {
  IP_ADDRESS: 2,
  PORT: 3,
  USERNAME: 4,
};

/**
 * Parses the given arguments and returns an object
 * containing the IP address, port, and username.
 *
 * @param {string[]} [args=[]] the arguments given
 * by the user
 * @returns {object} an object containing the IP
 * address, port, and username.
 */
const parseArguments = (args = []) => {
  const ipAddress = args[INDICES.IP_ADDRESS] || '127.0.0.1';

  const port = args[INDICES.PORT] || 8000;

  let username = 'John Doe';
  if (args.length > INDICES.USERNAME) {
    username = args.slice(INDICES.USERNAME).join(' ');
  }

  return {
    ipAddress,
    port,
    username,
  };
};

module.exports = parseArguments;
