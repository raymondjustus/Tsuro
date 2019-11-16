const { getInput } = require('../../Common/__tests__');
const handleObserver = require('./handleObserver');

const main = () => {
  getInput().then(handleObserver);
};

main();
