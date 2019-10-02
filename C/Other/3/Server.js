class Server {
  constructor() {
    //empty
  }

  addNode(id) {
    console.log(`Added ${id}`);
    return "";
  }

  addEdge(id1, id2) {
    console.log(`Added edge from ${id1} to ${id2}`);
    return "";
  }

  addToken(color, id) {
    console.log(`Added ${color} to ${id}`);
    return "";
  }

  removeNode(id) {
    console.log(`Removed ${id}`);
    return "";
  }

  removeEdge(id1, id2) {
    console.log(`Removed edge from ${id1} to ${id2}`);
    return "";
  }

  removeToken(color) {
    console.log(`Removed ${color}`);
    return "";
  }

  getNode(id) {
    console.log(`Got ${id}`);
    return "";
  }

  getEdge(id1, id2) {
    console.log(`Got edge from ${id1} to ${id2}`);
    return "";
  }

  getToken(color, id) {
    console.log(`Added ${color} to ${id}`);
    return "";
  }

  getLabyrinth() {
    console.log(`Got Labyrinth`);
    throw "NONE EXIST";
  }

  isTherePathFromTokenToNode(tokenColor, nodeId) {
    console.log(`Checking path from ${tokenColor} to ${nodeId}`);
    return true;
  }
}

module.exports = Server;
