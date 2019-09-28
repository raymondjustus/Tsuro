const { createServer } = require('net');
const Ref = require('../../../B/Other/Ref');

const onData = inputRef => chunk => {
  const text = chunk.toString().trim();
  inputRef.set(input => `${input}${text} `);
};

const onClose = inputRef => () => {
  console.log(inputRef.get());
};

const onConnection = socket => {
  const inputRef = new Ref();
  socket.on('data', onData(inputRef));
  socket.on('close', onClose(inputRef));
};

const server = createServer(onConnection);

module.exports = server;
