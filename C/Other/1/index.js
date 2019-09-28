const server = require('./server');

const main = () => {
  server.listen(8000, '127.0.0.1');
};

module.exports = main;
