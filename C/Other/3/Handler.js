const { COMMANDS, COLORS } = require("./constants");
const Parser = require("./Parser");
const Server = require("./Server");
const ServerInstance = new Server();

/**
 * A Handler for Task 3 JSON commands. Requests the proper functions from the server.
 */
class Handler {
  /**
   * Initializes the Handler and its fields
   */
  constructor() {
    this.firstLab = false; // Flag for whether the first lab command has been received
  }
  /**
   * Handles a lab command to send addnode and addEdge commands
   *
   * @param {Array} jsonObjArray An array of objects in the format of [ {from: node1, to: node2} ...]
   * @throws Error if the edge exists in the Labyrinth
   * @private
   */
  _onLabCommand(jsonObjArray) {
    console.log(`Lab CMD:`);
    if (this.firstLab) {
      throw "Lab already created.";
    }
    this.firstLab = true;
    // Loop through all edge pairs
    jsonObjArray.forEach(jsonPair => {
      // Add nodes that haven't been added yet
      Object.values(jsonPair).forEach(nodeId => {
        try {
          ServerInstance.addNode(nodeId);
        } catch (e) {
          console.log(e);
        }
      });
      // Confirm this edge doesn't already exist in our edge list
      try {
        ServerInstance.addEdge(jsonPair.from, jsonPair.to);
      } catch (e) {
        console.log(e);
      }
      //Return newly made Labyrinth
      try {
        console.log(ServerInstance.getLabyrinth());
      } catch (e) {
        console.log(e);
      }
    });
  }

  /**
   * Handles an add command to send addToken commands
   *
   * @param {object} jsonObj A object in the format of {token: name, name: name}
   * @throws Error If function is called before a lab command was called
   * @private
   */
  _onAddCommand(jsonObj) {
    console.log(`Add CMD:`);
    if (!this.firstLab) {
      throw new Error("lab must be the first command");
    }
    const token = jsonObj.token;
    const name = jsonObj.name;

    if (!Object.values(COLORS).includes(token)) {
      console.error(`Invalid color: ${token}`);
      return;
    }

    try {
      ServerInstance.addToken(token, name);
    } catch (e) {
      console.log(e);
    }

    try {
      console.log(`Token ${ServerInstance.getToken(token)} exists`);
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * Handles an move command to send removeToken and addToken commands
   *
   * @param {object} jsonObj A object in the format of {token: name, name: name}
   * @throws Error If function is called before a lab command was called
   * @private
   */
  _onMoveCommand(jsonObj) {
    console.log(`Move CMD:`);
    if (!this.firstLab) {
      throw new Error("lab must be the first command");
    }
    const token = jsonObj.token;
    const name = jsonObj.name;

    if (!Object.values(COLORS).includes(token)) {
      console.error(`Invalid color: ${token}`);
      return;
    }
    // Check that the token does exist and that the node does exist
    //CLEINT: getToken(token), if recieve token, duplicate, print to console
    //CLEINT: getNode(name), if recieve error, node doesn't exist, print to console
    try {
      ServerInstance.getToken(token);
      ServerInstance.getNode(name);
      ServerInstance.removeToken(name);
      ServerInstance.addToken(token, name);
      console.log(`Token ${ServerInstance.getToken(name)} is still around`);
    } catch (e) {
      console.log(e);
    }
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
        this._onAddCommand(jsonObj[1]);
        break;
      case COMMANDS.MOVE:
        this._onMoveCommand(jsonObj[1]);
        break;
      default:
        throw new Error(`Invalid Command Key: ${cmd}`);
    }
  }
}

module.exports = Handler;
