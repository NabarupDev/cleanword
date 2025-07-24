# No Gaali Zone

> A simple, multi-language, profanity filter for Indian languages.

## Overview

**No Gaali Zone** is a Node.js library that helps you detect and clean abusive words ("gaali") from text in multiple Indian languages. It uses curated lists of abusive words for each language and can be easily integrated into your projects to keep your content clean and respectful.

## Features

- Detects and censors abusive words in 20+ Indian languages
- Easy to use API
- Fast lookup using Set data structure
- Easily extensible with new word lists

## Supported Languages

Assamese, Bengali, Bhojpuri, Bundelkhandi, Chhattisgarhi, Gujarati, Haryanvi, Hindi, Kannada, Konkani, Maithili, Malayalam, Marathi, Marwari, Meitei, Nagpuri, Odia, Punjabi, Rajasthani, Tamil, Telugu, Urdu

## Installation

```bash
npm install no-gaali-zone
```

Or clone this repository:

```bash
git clone https://github.com/NabarupDev/no-gaali-zone.git
cd no-gaali-zone
```

## Usage

```js
const { cleanText } = require('no-gaali-zone');

const input = 'You are a badword!'; // Replace 'badword' with an actual abusive word from the lists
const cleaned = cleanText(input);
console.log(cleaned); // Output: You are a ******!
```

### How it works

The library loads abusive words from JSON files in the `words/` directory and creates a fast lookup set. When you call `cleanText(text)`, it replaces any abusive word with asterisks (\*), preserving the original word length.

## Project Structure

- `index.js` – Main module exposing the API
- `server.js` – (Optional) Example server usage
- `words/` – JSON files containing abusive words for each language

## Adding/Updating Word Lists

To add or update abusive words for a language, edit or add a JSON file in the `words/` directory. Each file should export an array of words or an object with an `abuse_words` array.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to add new words, fix bugs, or suggest improvements.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Author

Nabarup Roy
