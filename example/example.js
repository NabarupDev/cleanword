const { cleanText } = require('../index');

const options = {
  language: ['english', 'hindi'],
  grawlixChar: '@',
  alwaysAllow: ['kutto'],
  alwaysBlock: ['test', 'what'],
};
const cleaned = cleanText('This is a test sentence with kutto and what.', options);
console.log(cleaned); // This is a @@@@ sentence with kutto and @@@@.