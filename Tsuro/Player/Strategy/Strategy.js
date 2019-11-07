class Strategy {
  /**
   * Determines a player's initial action.
   *
   * Implementation left to subclasses.
   *
   * @param {string} id the player's ID
   * @param {Tile[]} hand the player's current hand of tiles
   * @param {BoardState} boardState the current state of the board
   * @returns {InitialAction} the determined initial action
   */
  // eslint-disable-next-line no-unused-vars
  static getInitialAction(id, hand, boardState) {
    throw 'Implement!';
  }

  /**
   * Determines a player's intermediate action.
   *
   * Implementation left to subclasses.
   *
   * @param {string} id the player's ID
   * @param {Tile[]} hand the player's current hand of tiles
   * @param {BoardState} boardState the current state of the board
   * @returns {IntermediateAction} the determined intermediate action
   */
  // eslint-disable-next-line no-unused-vars
  static getIntermediateAction(id, hand, boardState) {
    throw 'Implement!';
  }
}

module.exports = Strategy;
