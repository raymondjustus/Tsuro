const getInput = require('../../Common/__tests__/getInput');
const handlePlacements = require('../../Common/__tests__/handlePlacements');

const main = () => {
  getInput().then(handlePlacements);
};

module.exports = main;
