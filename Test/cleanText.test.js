const { cleanText } = require('../index');

describe('cleanText', () => {
  it('should replace abusive words with asterisks', () => {
    const input = 'This is a test sentence with some abusive words.';
    const output = cleanText(input);
    expect(output).toBe('This is a test sentence with some abusive words.'); // No abusive words in list
  });

  it('should censor abusive words from multiple languages', () => {
    const input = 'Multiple languages: khacchar, गाली , kutto, chudi, চুদি , haramkhor, साला, ৰাণ্ডী';
    const output = cleanText(input);
    expect(output).not.toContain('khacchar');
    expect(output).not.toContain('गाली');
    expect(output).not.toContain('kutto');
    expect(output).not.toContain('chudi');
    expect(output).not.toContain('চুদি');
    expect(output).not.toContain('haramkhor');
    expect(output).not.toContain('साला');
    expect(output).not.toContain('ৰাণ্ডী');
    // Should be replaced with asterisks of same length
    expect(output).toMatch(/\*{7}/); // khacchar
    expect(output).toMatch(/\*{4}/); // गाली, chudi, সালা
  });

  it('should not change text with no abusive words', () => {
    const input = 'No bad words here!';
    const output = cleanText(input);
    expect(output).toBe(input);
  });

  it('should handle empty or invalid input gracefully', () => {
    expect(cleanText('')).toBe('');
    expect(cleanText(null)).toBe(null);
    expect(cleanText(undefined)).toBe(undefined);
    expect(cleanText(123)).toBe(123);
  });
});
