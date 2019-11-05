const IStrategy = {
  // eslint-disable-next-line no-unused-vars
  determineAction(id, hand, boardState) {
    throw new Error('Implement!');
  },
};

module.exports = IStrategy;
