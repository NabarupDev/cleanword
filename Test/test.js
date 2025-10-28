// WARNING: this file contains profanity. The below list of profane words is necessary for this tool to function properly.
// Do not read below this line if you do not wish to be exposed to lots of profane words 

const { cleanText } = require('../index');
const testInputs = [
  'This is a test sentence with some abusive words and fuck.',
  'Type any abusive word here to check.',
  'गाली यहाँ है।',
  'চুদি এখানে আছে।',
  'لنڈ چوس یہاں ہے۔',
  'fuck and kutto are here.',
  'No bad words here!',
  'गांडू और मादरचोद यहाँ हैं।',
  'fuck and bastard are here.',
  'لنڈ چوس اور حرامخور یہاں ہیں۔',
  'what',
  'Your input text here গালি চুদি ',
  'Text with standalone matras: া ি ী ু ূ ৃ ে ৈ should not be censored',
];

console.log('Testing cleanText function for Hindi and Bengali with custom grawlix:');


async function runLanguageTests() {
  const options = {
    language: ['hindi', 'bengali', 'english', 'urdu'],
    grawlixChar: '*',
    alwaysAllow: ['fuck', 'kutto'], // fuck and kutto will never be censored
    alwaysBlock: ['test', 'aand', 'Type', 'what'], // test, aand, and Type will always be censored
  };
  for (let idx = 0; idx < testInputs.length; idx++) {
    const input = testInputs[idx];
    const cleaned = await cleanText(input, options);
    console.log(`Test ${idx + 1}:`);
    console.log('Original:', input);
    console.log('Cleaned :', cleaned);
    console.log('---');
  }
}

runLanguageTests();
