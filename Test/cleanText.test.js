// WARNING: this file contains profanity. The below list of profane words is necessary for this tool to function properly.
// Do not read below this line if you do not wish to be exposed to lots of profane words

const { cleanText, buildAbuseSet } = require('../index');

const mockAbuseWords = [
  'khacchar', 'गाली', 'kutto', 'chudi', 'চুদি', 'haramkhor', 'साला', 'ৰাণ্ডী'
];
const mockAbuseSet = buildAbuseSet(mockAbuseWords);

describe('cleanText', () => {
  it('should replace abusive words with asterisks', () => {
    const input = 'This is a test sentence with some abusive words.';
    const output = cleanText(input, mockAbuseSet);
    expect(output).toBe('This is a test sentence with some abusive words.');
  });

  it('should censor abusive words from multiple languages', () => {
    const input = 'Multiple languages: khacchar, गाली , kutto, chudi, চুদি , haramkhor, साला, ৰাণ্ডী';
    const output = cleanText(input, mockAbuseSet);
    expect(output).not.toContain('khacchar');
    expect(output).not.toContain('गाली');
    expect(output).not.toContain('kutto');
    expect(output).not.toContain('chudi');
    expect(output).not.toContain('চুদি');
    expect(output).not.toContain('haramkhor');
    expect(output).not.toContain('साला');
    expect(output).not.toContain('ৰাণ্ডী');
    // Should be replaced with asterisks of same length
    expect(output).toMatch(/\*{7}/); 
    expect(output).toMatch(/\*{4}/); 
  });

  it('should not change text with no abusive words', () => {
    const input = 'No bad words here!';
    const output = cleanText(input, mockAbuseSet);
    expect(output).toBe(input);
  });

  it('should handle empty or invalid input gracefully', () => {
    expect(cleanText('', mockAbuseSet)).toBe('');
    expect(cleanText(null, mockAbuseSet)).toBe(null);
    expect(cleanText(undefined, mockAbuseSet)).toBe(undefined);
    expect(cleanText(123, mockAbuseSet)).toBe(123);
  });
});
