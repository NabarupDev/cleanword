const fs = require('fs');
const path = require('path');

// Load all abusive words from the words directory in parallel
const wordsDir = path.join(__dirname, 'words');
let abuseSet = null;

function loadAbuseWordsParallel() {
  const abuseWords = [];
  const files = fs.readdirSync(wordsDir).filter(file => file.endsWith('.json'));
  return Promise.all(
    files.map(file => {
      const filePath = path.join(wordsDir, file);
      return fs.promises.readFile(filePath, 'utf8')
        .then(content => {
          let data;
          try {
            data = JSON.parse(content);
          } catch (e) {
            return [];
          }
          let wordsArray = Array.isArray(data) ? data : (Array.isArray(data.abuse_words) ? data.abuse_words : []);
          const result = [];
          wordsArray.forEach(entry => {
            if (typeof entry === 'string') {
              result.push(entry.trim().toLowerCase());
            } else if (typeof entry === 'object' && entry !== null) {
              Object.values(entry).forEach(val => {
                if (typeof val === 'string') {
                  result.push(val.trim().toLowerCase());
                } else if (Array.isArray(val)) {
                  val.forEach(item => {
                    if (typeof item === 'string') {
                      result.push(item.trim().toLowerCase());
                    }
                  });
                }
              });
            }
          });
          return result;
        })
        .catch(() => []);
    })
  ).then(results => {
    results.forEach(arr => abuseWords.push(...arr));
    if (abuseWords.length) {
      abuseSet = new Set(abuseWords);
    }
  });
}

// Immediately start loading words in parallel (sync fallback for legacy usage)
const abuseWordsPromise = loadAbuseWordsParallel();

/**
 * Cleans the input text by removing abusive words from all languages.
 * @param {string} text - The input text to clean.
 * @returns {string} - The cleaned text.
 */

/**
 * Cleans the input text by removing abusive words from all languages.
 * @param {string} text - The input text to clean.
 * @returns {Promise<string>} - The cleaned text.
 */
async function cleanText(text) {
  if (!text || typeof text !== 'string') return text;
  // Wait for abuseSet to be ready
  await abuseWordsPromise;
  if (!abuseSet) return text;
  // Tokenize input (words and punctuation)
  return text.replace(/\w+/gu, (word) => {
    const lower = word.toLowerCase();
    if (abuseSet.has(lower)) {
      return '*'.repeat(word.length);
    }
    return word;
  });
}

module.exports = {
  cleanText
};
