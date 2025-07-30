const wordsMap = require('./src/abuse_words.js');


/**
 * Builds a Set of abusive words from the map, filtered by language(s).
 * @param {Map} map - The words map.
 * @param {string|string[]} [languages] - Language or array of languages to include. If not provided, defaults to 'hindi'.
 * @returns {Set<string>} - Set of abusive words.
 */
function buildAbuseSetFromMap(map, languages) {
  if (!map || typeof map.forEach !== 'function') return null;
  let langs = languages;
  if (!langs) langs = ['hindi'];
  if (typeof langs === 'string') langs = [langs];
  const allWords = [];
  langs.forEach(lang => {
    const arr = map.get(lang.toLowerCase());
    if (Array.isArray(arr)) {
      allWords.push(...arr);
    }
  });
  return new Set(
    allWords
      .filter(word => typeof word === 'string')
      .map(word => word.trim().toLowerCase().normalize('NFC'))
  );
}

let abuseSet = buildAbuseSetFromMap(wordsMap, 'hindi');


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

/**
 * Cleans the input text by removing abusive words from selected languages.
 * @param {string} text - The input text to clean.
 * @param {Object} [options] - Options object.
 * @param {string|string[]} [options.language] - Language or array of languages to filter (default: 'hindi').
 * @param {Set<string>} [options.customAbuseSet] - Optional custom set of abusive words (for testing).
 * @returns {string} - The cleaned text.
 */
function cleanText(text, options = {}) {
  if (!text || typeof text !== 'string') return text;
  let setToUse = options.customAbuseSet;
  if (!setToUse) {
    setToUse = buildAbuseSetFromMap(wordsMap, options.language || 'hindi');
  }
  if (!setToUse) return text;
  const grawlixChar = typeof options.grawlixChar === 'string' && options.grawlixChar.length > 0 ? options.grawlixChar : '*';
  
  // Prepare alwaysAllow and alwaysBlock sets
  const alwaysAllow = Array.isArray(options.alwaysAllow) ? new Set(options.alwaysAllow.map(normalizeWord)) : new Set();
  const alwaysBlock = Array.isArray(options.alwaysBlock) ? new Set(options.alwaysBlock.map(normalizeWord)) : new Set();
  
  // Match words including combining marks (matras, diacritics) for Indic scripts
  return text.replace(/[\p{L}\p{M}\p{N}_]+/gu, (word) => {
    const normalized = /[\u0080-\uFFFF]/.test(word) ? normalizeWord(word) : word.trim().toLowerCase();
    if (alwaysAllow.has(normalized)) {
      return word; // Never censor
    }
    if (alwaysBlock.has(normalized)) {
      return grawlixChar.repeat(word.length); // Always censor
    }
    if (setToUse.has(normalized)) {
      return grawlixChar.repeat(word.length);
    }
    return word;
  });
}

module.exports = {
  cleanText,
  buildAbuseSetFromMap
};
