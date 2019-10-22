class Player {
  /**
   * Creates a new Player, with an empty hand.
   *
   * @param {string} id the unique ID of the player
   * @param {string} name the name of the player
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.hand = [];
  }
}

module.exports = Player;
