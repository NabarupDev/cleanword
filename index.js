const allAbuseWords = require('./src/abuse_words');

function buildAbuseSet(words) {
  if (!Array.isArray(words) || !words.length) return null;
  return new Set(
    words
      .filter(word => typeof word === 'string')
      .map(word => word.trim().toLowerCase().normalize('NFC'))
  );
}

let abuseSet = buildAbuseSet(allAbuseWords);


function normalizeWord(word) {
  return word.trim().toLowerCase().normalize('NFC');
}

/**
 * Cleans the input text by removing abusive words from all languages.
 * @param {string} text - The input text to clean.
 * @returns {string} - The cleaned text.
 */
/**
 * Cleans the input text by removing abusive words from all languages.
 * @param {string} text - The input text to clean.
 * @param {Set<string>} [customAbuseSet] - Optional custom set of abusive words (for testing).
 * @returns {string} - The cleaned text.
 */
function cleanText(text, customAbuseSet) {
  if (!text || typeof text !== 'string') return text;
  const setToUse = customAbuseSet || abuseSet;
  if (!setToUse) return text;
  // Match words including combining marks (matras, diacritics) for Indic scripts
  return text.replace(/[\p{L}\p{M}\p{N}_]+/gu, (word) => {
    // Only normalize if needed (skip if ASCII)
    const normalized = /[\u0080-\uFFFF]/.test(word) ? normalizeWord(word) : word.trim().toLowerCase();
    if (setToUse.has(normalized)) {
      return '*'.repeat(word.length);
    }
    return word;
  });
}

module.exports = {
  cleanText,
  buildAbuseSet
};
