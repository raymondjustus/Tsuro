const { COMMANDS, COLORS } = require("./constants");
const Parser = require("./Parser");
const Handler = require("./Handler");

const main = () => {
  const parser = new Parser();
  const handler = new Handler();

  var commands = [];
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", data => {
    let chunk = data;
    commands.push(parser.parse(chunk));
  });
  process.stdin.on("end", () => {
    commands.forEach(cmd => {
      //console.log(`CMD: ${cmd}`);
      handler.handle(cmd);
    });
  });
};

module.exports = main;
