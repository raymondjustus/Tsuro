const getClient = require('./getClient');
const parseArguments = require('./parseArguments');

const main = () => {
  const { ipAddress, port } = parseArguments(process.argv);
  getClient(ipAddress, port)
    .then(client => {
      client.on('data', data => {
        const text = data.toString().trim();
        console.log(`SERVER: ${text}`);
      });
    })
    .catch(() => {
      process.exit(1);
    });
};

module.exports = main;
