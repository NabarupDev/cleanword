const { cleanText } = require('./index');

// Example test cases
const testInputs = [
  'This is a test sentence with some abusive words.',
  'Type any abusive word here to check.',
  'Multiple languages:khacchar, गाली, kutto, chudi, চুদি, haramkhor, साला',
  'No bad words here!'
];

console.log('Testing cleanText function:');
testInputs.forEach((input, idx) => {
  const cleaned = cleanText(input);
  console.log(`Test ${idx + 1}:`);
  console.log('Original:', input);
  console.log('Cleaned :', cleaned);
  console.log('---');
});
