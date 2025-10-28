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
 * Counts the number of grapheme clusters (visible characters) in a string.
 * This handles combining marks (matras) in Indic scripts correctly.
 * @param {string} str - The string to count.
 * @returns {number} - The number of visible characters.
 */
function countGraphemes(str) {
  // Use Intl.Segmenter if available (modern browsers/Node.js 16+)
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(str)).length;
  }
  // Fallback: Remove combining marks and count
  // This works because combining marks (matras) attach to base characters
  const withoutCombiningMarks = str.replace(/\p{M}/gu, '');
  return withoutCombiningMarks.length;
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
  
  // Match words that start with letters/numbers and may include combining marks (matras, diacritics)
  // This prevents standalone combining marks from being matched
  return text.replace(/[\p{L}\p{N}][\p{L}\p{M}\p{N}_]*/gu, (word) => {
    const normalized = /[\u0080-\uFFFF]/.test(word) ? normalizeWord(word) : word.trim().toLowerCase();
    if (alwaysAllow.has(normalized)) {
      return word; // Never censor
    }
    if (alwaysBlock.has(normalized)) {
      // Count grapheme clusters (visible characters) for proper replacement
      const graphemeCount = countGraphemes(word);
      return grawlixChar.repeat(graphemeCount); // Always censor
    }
    if (setToUse.has(normalized)) {
      // Count grapheme clusters (visible characters) for proper replacement
      const graphemeCount = countGraphemes(word);
      return grawlixChar.repeat(graphemeCount);
    }
    return word;
  });
}

module.exports = {
  cleanText,
  buildAbuseSetFromMap,
  countGraphemes
};
