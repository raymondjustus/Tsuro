const { COMMANDS, COLORS } = require('./constants');

class Parser {
  constructor() {
    this.edges = [];
    this.nodes = [];
    this.tokens = new Map();
    this.firstLab = false;
  }
  /**
   * Handles a lab command to send addnode and addEdge commands
   * @param jsonObjArray An array of objects in the format of [ {from: node1, to: node2} ...]
   * @private
   */
  _labCommand(jsonObjArray) {
    console.log(`Lab CMD:`);
    if (this.firstLab) {
      throw new Error('lab must be the first command');
    }
    this.firstLab = true;
    // Loop through all edge pairs
    jsonObjArray.forEach(jsonPair => {
      // Add nodes that haven't been added yet
      Object.values(jsonPair).forEach(nodeId => {
        // Confirm this node hasn't already been added
        if (!this.nodes.includes(nodeId)) {
          // CLIENT: addNode()
          this.nodes.push(nodeId);
          console.log(` Node ${nodeId} created`);
        }
      });
      // Confirm this edge doesn't already exist in our edge list
      this.edges.forEach(pair => {
        const from = pair.from;
        const to = pair.to;
        if (from === jsonPair.to || from === jsonPair.from) {
          if (to === jsonPair.to || to === jsonPair.from) {
            throw new Error(` The edge ${JSON.stringify(jsonPair)} exists in Labryinth as ${pair}`);
          }
        }
      });
      // If it does not exist, push the pair to our container and send addEdge
      // CLIENT: addEdge()
      console.log(` Edge ${JSON.stringify(jsonPair)} created`);
      this.edges.push(jsonPair);
    });
  }

  /**
   * Handles an add command to send addToken commands
   * @param jsonObj A object in the format of {token: name, name: name}
   * @private
   */
  _addCommand(jsonObj) {
    console.log(`Add CMD:`);
    if (!this.firstLab) {
      throw new Error('lab must be the first command');
    }
    const token = jsonObj.token;
    const name = jsonObj.name;
    if (!Object.values(COLORS).includes(token)) {
      console.error(`Invalid color: ${token}`);
      return;
    }
    // Check that the token does not already exist and that the node does exist
    if (this.tokens.has(token) || !this.nodes.includes(name)) {
      console.error('Invalid command. Either Token exists or node does not exist.');
      return;
    }
    // CLIENT: addToken()
    console.log(` Token ${token} created on node ${name}`);
    this.tokens.set(token, name);
  }
  /**
   * Handles an move command to send removeToken and addToken commands
   * @param jsonObj A object in the format of {token: name, name: name}
   * @private
   */
  _moveCommand(jsonObj) {
    console.log(`Move CMD:`);
    if (!this.firstLab) {
      throw new Error('lab must be the first command');
    }
    const token = jsonObj.token;
    const name = jsonObj.name;
    if (!Object.values(COLORS).includes(token)) {
      console.error(`Invalid color: ${token}`);
      return;
    }
    // Check that the token does exist and that the node does exist
    if (!this.tokens.has(token) || !this.nodes.includes(name)) {
      console.error('Invalid command. Either Token does not exist or node does not exist.');
      return;
    }
    // CLIENT: removeToken()
    // CLIENT: addToken()
    console.log(` Token ${token} moved to node ${name}`);
    this.tokens.set(token, name);
  }

  /**
   * Parses a Task 3 JSON command. Three commands are supported, "lab", "add", and "move"
   * @param json The raw JSON from the server
   */
  parse(json) {
    try {
      const jsonObj = JSON.parse(json);
      const cmd = jsonObj[0];
      // Check if we got a valid command
      if (!Object.values(COMMANDS).includes(cmd)) {
        throw new Error(`Invalid Command Key: ${cmd}`);
      }
      // Handle which action to take based on command
      switch (cmd) {
        case COMMANDS.LAB:
          this._labCommand(jsonObj.slice(1));
          break;
        case COMMANDS.ADD:
          this._addCommand(jsonObj[1]);
          break;
        case COMMANDS.MOVE:
          this._moveCommand(jsonObj[1]);
          break;
        default:
          throw new Error(`Invalid Command Key: ${cmd}`);
      }
    } catch (e) {
      throw new Error(`${e}. Shutting down client`);
    }
  }
}

const main = () => {
  const testLab =
    '["lab", { "from": "fromTest", "to": "toTest" },{ "from": "fromTest2", "to": "toTest2" }]';
  const testAdd = '["add", { "token": "blue", "name": "toTest" }]';
  const testMove = '["move", { "token": "blue", "name": "fromTest" }]';
  const parser = new Parser();
  parser.parse(testLab);
  parser.parse(testAdd);
  parser.parse(testMove);
};

module.exports = main;
