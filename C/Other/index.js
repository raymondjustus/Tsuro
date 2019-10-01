const { COMMANDS, COLORS } = require("./constants");

/**
 * A Parser for Task 3 JSON commands. Requests the proper functions from the server.
 */
class Parser {
  /**
   * Initializes the Parser and its fields
   */
  constructor() {
    this.edges = [];
    this.nodes = [];
    this.tokens = new Map();
    this.firstLab = false; // Flag for whether the first lab command has been received
  }
  /**
   * Handles a lab command to send addnode and addEdge commands
   *
   * @param {Array} jsonObjArray An array of objects in the format of [ {from: node1, to: node2} ...]
   * @throws Error if the edge exists in the Labyrinth
   * @private
   */
  _labCommand(jsonObjArray) {
    console.log(`Lab CMD:`);
    if (this.firstLab) {
      //CLIENT: getLabyrinth(), if ERROR, may proceed with creation of Labyrinth, if returns Labyrinth, error
      throw new Error("lab must be the first command");
    }
    this.firstLab = true;
    // Loop through all edge pairs
    jsonObjArray.forEach(jsonPair => {
      // Add nodes that haven't been added yet
      Object.values(jsonPair).forEach(nodeId => {
        // Confirm this node hasn't already been added
        // CLIENT: call to server: getNode(nodeId), expects an error, if none, node does not exist
        if (!this.nodes.includes(nodeId)) {
          // CLIENT: addNode(nodeId), try/catch the call and print error as needed
          this.nodes.push(nodeId);
          console.log(` Node ${nodeId} created`);
        }
      });
      // Confirm this edge doesn't already exist in our edge list
      // CLIENT: getNode()
      this.edges.forEach(pair => {
        const from = pair.from;
        // CLIENT: getNode(from), no error confirms the node exists
        const to = pair.to;
        // CLIENT: getNode(to), no error confirms this node exists
        if (from === jsonPair.to || from === jsonPair.from) {
          // CLIENT: getEdge(from, to), if this errors, the edge does not exist this direction
          if (to === jsonPair.to || to === jsonPair.from) {
            // CLIENT: getEdge(to, from), if this errors, the edge does not exist this direction
            throw new Error(
              ` The edge ${JSON.stringify(
                jsonPair
              )} exists in Labryinth as ${pair}`
            );
          }
        }
      });
      // If it does not exist, push the pair to our container and send addEdge
      // CLIENT: addEdge(from, to), try/catch the call and print error as needed
      console.log(` Edge ${JSON.stringify(jsonPair)} created`);
      this.edges.push(jsonPair);
      //CLIENT: getLabyrinth(), prints to STDOUT to show creation has been achieved
    });
  }

  /**
   * Handles an add command to send addToken commands
   *
   * @param {object} jsonObj A object in the format of {token: name, name: name}
   * @throws Error If function is called before a lab command was called
   * @private
   */
  _addCommand(jsonObj) {
    console.log(`Add CMD:`);
    //CLIENT: getLabyrinth(), throws an error if given empty or error
    if (!this.firstLab) {
      throw new Error("lab must be the first command");
    }
    const token = jsonObj.token;
    const name = jsonObj.name;

    if (!Object.values(COLORS).includes(token)) {
      console.error(`Invalid color: ${token}`);
      return;
    }
    // Check that the token does not already exist and that the node does exist
    //CLEINT: getToken(token), if recieve token, duplicate, print to console
    //CLEINT: getNode(name), if recieve error, node doesn't exist, print to console
    if (this.tokens.has(token) || !this.nodes.includes(name)) {
      console.error(
        "Invalid command. Either Token exists or node does not exist."
      );
      return;
    }
    // CLIENT: addToken(token, name), prints error if server returns one
    console.log(` Token ${token} created on node ${name}`);
    this.tokens.set(token, name);
    //CLIENT: getToken(token), prints to STDOUT to show creation has been achieved
  }
  /**
   * Handles an move command to send removeToken and addToken commands
   *
   * @param {object} jsonObj A object in the format of {token: name, name: name}
   * @throws Error If function is called before a lab command was called
   * @private
   */
  _moveCommand(jsonObj) {
    console.log(`Move CMD:`);
    if (!this.firstLab) {
      //CLIENT: getLabyrinth(), throws an error if given empty or error
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
    if (!this.tokens.has(token) || !this.nodes.includes(name)) {
      console.error(
        "Invalid command. Either Token does not exist or node does not exist."
      );
      return;
    }
    // CLIENT: removeToken(token), prints error if given one to console
    // CLIENT: addToken(token, name), prints error if given one to console
    console.log(` Token ${token} moved to node ${name}`);
    this.tokens.set(token, name);
    //CLIENT: getNode(name), prints to STDOUT to show move worked
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
  // const testLab =
  //   '["lab", { "from": "fromTest", "to": "toTest" },{ "from": "fromTest2", "to": "toTest2" }]';
  // const testAdd = '["add", { "token": "blue", "name": "toTest" }]';
  // const testMove = '["move", { "token": "blue", "name": "fromTest" }]';
  const parser = new Parser();
  // parser.parse(testLab);
  // parser.parse(testAdd);
  // parser.parse(testMove);

  //read in from STDIN, on ctr+d (end of connection), parse and send stuff to server?
  var readline = require("readline");

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  /*
  
  ASSUMPTION: all 'JSON' input given at once, no delimeter between them, ie:
  
  ["lab", { "from": "fromTest", "to": "toTest" },{ "from": "fromTest2", "to": "toTest2" }]["add", { "token": "blue", "name": "toTest" }]   

  the above creates a lab, adds 4 nodes, 2 edges, and then adds a token to one of the nodes.
  */
  rl.on("line", function(line) {
    let cmds = line.split("]");
    cmds.forEach(cmd => {
      if (cmd) {
        cmd += "]";
        console.log(cmd);
        parser.parse(cmd);
      }
    });
  });
};

module.exports = main;
