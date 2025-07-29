// WARNING: this file contains profanity. The below list of profane words is necessary for this tool to function properly.
// Do not read below this line if you do not wish to be exposed to lots of profane words

const { cleanText } = require('./index');

const testInputs = [
  'This is a test sentence with some abusive words.',
  'Type any abusive word here to check.',
  'Multiple languages: khacchar, गाली, kutto, chudi, চুদি , haramkhor, साला, ৰাণ্ডী fuck',
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
