const { COMMANDS, COLORS } = require("./constants");

class Parser {
  /**
   * Parses a Task 3 JSON command. Three commands are supported, "lab", "add", and "move"
   *
   * @param {string} json The raw JSON from the server
   */
  parse(json) {
    const jsonObj = JSON.parse(json);
    const cmd = jsonObj[0];
    // Check if we got a valid command
    if (!Object.values(COMMANDS).includes(cmd)) {
      throw `Invalid Command Key: ${cmd}`;
    }
    return jsonObj;
  }
}

module.exports = Parser;
