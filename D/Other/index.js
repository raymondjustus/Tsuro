const getClient = require('./getClient');
const parseArguments = require('./parseArguments');

const main = () => {
  const { ipAddress, port } = parseArguments(process.argv);
  getClient(ipAddress, port)
    .then(client => {
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', data => {
        const text = data.toString().trim();
        client.write(text);
      });
      process.stdin.on('end', () => {
        console.log('END OF INPUT');
        client.destroy();
        process.exit(0);
      });

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
