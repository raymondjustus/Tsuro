class Observer {
  constructor() {
    this._boardState = null;
  }

  updateBoardState(boardState) {
    this._boardState = boardState;
  }

  render() {
    if (!this._boardState) {
      throw 'No board state to render';
    }

    this._boardState.renderToFile();
  }
}

module.exports = Observer;
