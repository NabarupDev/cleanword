const { cleanText } = require('./index');
const testInputs = [
  'This is a test sentence with some abusive words and fuck.', // English
  'Type any abusive word here to check.',
  'Multiple languages: khacchar, aand गाली, kutto, chudi, لنڈ چوس ,চুদি , haramkhor, साला, ৰাণ্ডী fuck',
  'No bad words here!',
  'गांडू और मादरचोद यहाँ हैं।', // Hindi
  'fuck and bastard are here.', // English
  'لنڈ چوس اور حرامخور یہاں ہیں۔', // Urdu
  'চুদি এবং হারামখোর এখানে আছে।', // Bengali
  'what'
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
