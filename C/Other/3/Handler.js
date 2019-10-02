const { COMMANDS, COLORS } = require("./constants");
const Server = require("./Server");

/**
 * A Handler for Task 3 JSON commands. Requests the proper functions from the server.
 */
class Handler {
  /**
   * Initializes the Handler and its fields
   */
  constructor() {
    this.serverInstance = new Server();
    this.firstLab = false; // Flag for whether the first lab command has been received
  }

  _checkForFirstLab(isLabCommand) {
    if (isLabCommand) {
      if (this.firstLab) {
        throw "Lab already created.";
      }
    } else if (!this.firstLab) {
      throw 'lab" must be the first command';
    }
  }

  /**
   * Handles a lab command to send addnode and addEdge commands
   *
   * @param {Array} jsonObjArray An array of objects in the format of [ {from: node1, to: node2} ...]
   * @throws Error if the edge exists in the Labyrinth
   * @private
   */
  _onLabCommand(jsonObjArray) {
    this._checkForFirstLab(true);
    this.firstLab = true;
    // Loop through all edge pairs
    jsonObjArray.forEach(jsonPair => {
      // Add nodes that haven't been added yet
      Object.values(jsonPair).forEach(nodeId => {
        this.serverInstance.addNode(nodeId);
      });
      // Confirm this edge doesn't already exist in our edge list
      this.serverInstance.addEdge(jsonPair.from, jsonPair.to);
    });
  }

  /**
   * Handles an add command to send addToken commands
   *
   * @param {object} jsonObj A object in the format of {token: name, name: name}
   * @throws Error If function is called before a lab command was called
   * @private
   */
  _onAddCommand(token, name) {
    this._checkForFirstLab(false);

    if (!Object.values(COLORS).includes(token)) {
      throw `Invalid color: ${token}`;
    }

    this.serverInstance.addToken(token, name);
  }
  /**
   * Handles an move command to send removeToken and addToken commands
   *
   * @param {object} jsonObj A object in the format of {token: name, name: name}
   * @throws Error If function is called before a lab command was called
   * @private
   */
  _onMoveCommand(token, name) {
    this._checkForFirstLab(false);

    if (!Object.values(COLORS).includes(token)) {
      throw `Invalid color: ${token}`;
    }

    this.serverInstance.removeToken(name);
    this.serverInstance.addToken(token, name);
  }

  /**
   *
   * @param {object} jsonObj An object in the format of a json
   * @throws Error if cmd invalid
   */
  handle(jsonObj) {
    const cmd = jsonObj[0];
    // Handle which action to take based on command
    switch (cmd) {
      case COMMANDS.LAB:
        this._onLabCommand(jsonObj.slice(1));
        break;
      case COMMANDS.ADD:
        this._onAddCommand(jsonObj[1], jsonObj[2]);
        break;
      case COMMANDS.MOVE:
        this._onMoveCommand(jsonObj[1], jsonObj[2]);
        break;
      default:
        throw `Invalid Command Key: ${cmd}`;
    }
  }
}

module.exports = Handler;
