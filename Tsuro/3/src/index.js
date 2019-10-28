const getInput = require('./getInput');
const handlePlacements = require('./handlePlacements');

const main = () => {
  getInput().then(handlePlacements);
};

module.exports = main;
