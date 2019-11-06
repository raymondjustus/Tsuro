const getInput = require('../../Common/__tests__/getInput.js');
const handlePlacements = require('../../Common/__tests__/handlePlacements.js');

const main = () => {
  getInput().then(handlePlacements);
};

module.exports = main;
