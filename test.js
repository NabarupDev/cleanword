const { cleanText } = require('./index');

// Example test cases
const testInputs = [
  'This is a test sentence with some abusive words.',
  'Type any abusive word here to check.',
  'Multiple languages: khacchar, गाली, kutto, chudi, চুদি , haramkhor, साला, ৰাণ্ডী',
  'No bad words here!'
];


console.log('Testing cleanText function:');

async function runTests() {
  for (let idx = 0; idx < testInputs.length; idx++) {
    const input = testInputs[idx];
    const cleaned = await cleanText(input);
    console.log(`Test ${idx + 1}:`);
    console.log('Original:', input);
    console.log('Cleaned :', cleaned);
    console.log('---');
  }
}

runTests();
