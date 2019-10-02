const { COMMANDS, COLORS } = require("./constants");

class Parser {
  /**
   * A Parser for Task 3 JSON commands. Requests the proper functions from the server.
   */

  constructor() {
    //empty
  }
  /**
   * Parses a Task 3 JSON command. Three commands are supported, "lab", "add", and "move"
   *
   * @param {string} json The raw JSON from the server
   */
  parse(json) {
    try {
      const jsonObj = JSON.parse(json);
      const cmd = jsonObj[0];
      // Check if we got a valid command
      if (!Object.values(COMMANDS).includes(cmd)) {
        throw new Error(`Invalid Command Key: ${cmd}`);
      }
      return jsonObj;
    } catch (e) {
      throw new Error(`${e}. Shutting down client`);
    }
  }
}

module.exports = Parser;
