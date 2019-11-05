// eslint-disable-next-line no-unused-vars
const { BoardState } = require('../../Common');
const IStrategy = require('./IStrategy');

function DumbStrategy() {}
DumbStrategy.prototype = Object.create(IStrategy);

/**
 * @param {number} id
 * @param {Tile[]} hand
 * @param {BoardState} boardState
 */
DumbStrategy.prototype.determineAction = function(id, hand, boardState) {
  boardState.getAvatar(id);
};

module.exports = DumbStrategy;
