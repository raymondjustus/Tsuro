const { getInput } = require('../../Common/__tests__');
const handleReferee = require('./handleReferee');

const main = () => {
  getInput().then(handleReferee);
};

main();
