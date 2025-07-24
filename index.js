const fs = require('fs');
const path = require('path');

// Load all abusive words from the words directory
const wordsDir = path.join(__dirname, 'words');
const abuseWords = [];
let abuseSet = null;

fs.readdirSync(wordsDir).forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(wordsDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      // If the JSON is an object with an array property (like 'abuse_words'), use that
      let wordsArray = Array.isArray(data) ? data : (Array.isArray(data.abuse_words) ? data.abuse_words : []);
      wordsArray.forEach(entry => {
        if (typeof entry === 'string') {
          abuseWords.push(entry.trim().toLowerCase());
        } else if (typeof entry === 'object' && entry !== null) {
          Object.values(entry).forEach(val => {
            if (typeof val === 'string') {
              abuseWords.push(val.trim().toLowerCase());
            } else if (Array.isArray(val)) {
              val.forEach(item => {
                if (typeof item === 'string') {
                  abuseWords.push(item.trim().toLowerCase());
                }
              });
            }
          });
        }
      });
    } catch (e) {
      // Ignore invalid files
    }
  }
});



// Create a Set for fast lookup
if (abuseWords.length) {
  abuseSet = new Set(abuseWords);
}

/**
 * Cleans the input text by removing abusive words from all languages.
 * @param {string} text - The input text to clean.
 * @returns {string} - The cleaned text.
 */
function cleanText(text) {
  if (!text || typeof text !== 'string' || !abuseSet) return text;
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
