
const { cleanText } = require('../index');

describe('cleanText', () => {
  const testCases = [
    {
      input: 'This is a test sentence with some abusive words and fuck.',
      expected: 'This is a test sentence with some abusive words and ****.',
      options: { language: ['english'], grawlixChar: '*' },
      desc: 'should censor English abusive word',
    },
    {
      input: 'Type any abusive word here to check.',
      expected: 'Type any abusive word here to check.',
      options: { language: ['english'], grawlixChar: '*' },
      desc: 'should not censor when no abusive word',
    },
    {
      input: 'Multiple languages: khacchar, aand गाली, kutto, chudi, لنڈ چوس ,চুদি , haramkhor, साला, ৰাণ্ডী fuck',
      expected: expect.stringContaining('****'),
      options: { language: ['hindi', 'bengali', 'english', 'urdu'], grawlixChar: '*' },
      desc: 'should censor abusive words in multiple languages',
    },
    {
      input: 'No bad words here!',
      expected: 'No bad words here!',
      options: { language: ['hindi', 'bengali', 'english', 'urdu'], grawlixChar: '*' },
      desc: 'should not censor clean text',
    },
    {
      input: 'गांडू और मादरचोद यहाँ हैं।',
      expected: expect.not.stringContaining('गांडू'),
      options: { language: ['hindi'], grawlixChar: '*' },
      desc: 'should censor Hindi abusive words',
    },
    {
      input: 'fuck and bastard are here.',
      expected: expect.stringContaining('****'),
      options: { language: ['english'], grawlixChar: '*' },
      desc: 'should censor multiple English abusive words',
    },
    {
      input: 'لنڈ چوس اور حرامخور یہاں ہیں۔',
      expected: expect.not.stringContaining('لنڈ'),
      options: { language: ['urdu'], grawlixChar: '*' },
      desc: 'should censor Urdu abusive words',
    },
    {
      input: 'চুদি এবং হারামখোর এখানে আছে।',
      expected: expect.not.stringContaining('চুদি'),
      options: { language: ['bengali'], grawlixChar: '*' },
      desc: 'should censor Bengali abusive words',
    },
    {
      input: 'fuck',
      expected: '@@@@',
      options: { language: ['english'], grawlixChar: '@' },
      desc: 'should use custom grawlix character',
    },

    // Additional tests for alwaysAllow and alwaysBlock
    {
      input: 'fuck and kutto are here.',
      expected: 'fuck and kutto are here.',
      options: { language: ['english', 'hindi'], alwaysAllow: ['fuck', 'kutto'], grawlixChar: '*' },
      desc: 'should never censor alwaysAllow words even if abusive',
    },
    {
      input: 'This is a test sentence with kutto and what.',
      expected: 'This is a **** sentence with kutto and ****.',
      options: { language: ['english', 'hindi'], alwaysAllow: ['kutto'], alwaysBlock: ['test', 'what'], grawlixChar: '*' },
      desc: 'should always censor alwaysBlock words even if not abusive',
    },
    {
      input: 'Type fuck kutto aand',
      expected: '**** fuck kutto ****',
      options: { language: ['english', 'hindi'], alwaysAllow: ['fuck', 'kutto'], alwaysBlock: ['Type', 'aand'], grawlixChar: '*' },
      desc: 'should combine alwaysAllow and alwaysBlock correctly',
    },
    {
      input: 'Type fuck kutto aand',
      expected: '@@@@ fuck kutto @@@@',
      options: { language: ['english', 'hindi'], alwaysAllow: ['fuck', 'kutto'], alwaysBlock: ['Type', 'aand'], grawlixChar: '@' },
      desc: 'should use custom grawlix with alwaysAllow and alwaysBlock',
    },
  ];

  testCases.forEach(({ input, expected, options, desc }) => {
    it(desc, () => {
      const result = cleanText(input, options);
      if (typeof expected === 'string') {
        expect(result).toBe(expected);
      } else {
        expect(result).toEqual(expected);
      }
    });
  });
});
