<div align="center">
 <h1>Cleantext</h1>
</div>

A simple, fast, and extensible JavaScript package to detect and censor abusive words in multiple Indian and international languages. Useful for chat moderation, content filtering, and building safe online communities.

## Features
- Detects and censors abusive words in Hindi, English, Bengali, Urdu, and more
- Customizable censorship character (grawlix)
- Fine-grained control with `alwaysAllow` and `alwaysBlock` word lists
- Easy to use and integrate in Node.js projects

---

## Installation

```sh
npm install cleantext
```

---

## Usage

### Basic Example
```js
const { cleanText } = require('cleantext');

const options = {
  language: ['english', 'hindi'],
  grawlixChar: '@',
  alwaysAllow: ['kutto'],
  alwaysBlock: ['test', 'what'],
};
const cleaned = cleanText('This is a test sentence with kutto and what.', options);
console.log(cleaned); // This is a @@@@ sentence with kutto and @@@@..
```

### API
#### `cleanText(text, options)`
- **text** (`string`): The input string to clean.
- **options** (`object`, optional):
  - `language`: `string | string[]` — Language(s) to check (default: `'hindi'`).
  - `grawlixChar`: `string` — Character to use for censorship (default: `'*'`).
  - `alwaysAllow`: `string[]` — Words that should never be censored, even if abusive.
  - `alwaysBlock`: `string[]` — Words that should always be censored, even if not abusive.
  - `customAbuseSet`: `Set<string>` — Custom set of abusive words (for advanced use/testing).

Returns: The cleaned string with abusive words replaced by the grawlix character.

#### Example with config options
```js
const options = {
  language: ['english', 'hindi'],
  grawlixChar: '@',
  alwaysAllow: ['kutto'],
  alwaysBlock: ['test', 'what'],
};
const cleaned = cleanText('This is a test sentence with kutto and what.', options);
console.log(cleaned); // This is a @@@@ sentence with kutto and @@@@.
```

---

## Config Options

| Option         | Type            | Description |
|----------------|----------------|-------------|
| `language`     | string/string[] | Languages to check (e.g. `'hindi'`, `'english'`, `'bengali'`, `'urdu'`) |
| `grawlixChar`  | string          | Character to use for censorship (default: `'*'`) |
| `alwaysAllow`  | string[]        | Words to never censor |
| `alwaysBlock`  | string[]        | Words to always censor |
| `customAbuseSet` | Set<string>    | Custom abusive word set (advanced/testing) |

---

## Supported Languages

- Hindi
- English
- Assamese
- Bengali
- Bhojpuri
- Marathi
- Chhattisgarhi
- Gujarati
- Haryanvi
- Kannada 
- Kashmiri
- Konkani
- Ladakhi
- Malayalam
- Manipuri
- Marwari
- Nepali
- Odia
- Punjabi
- Rajasthani
- Tamil
- Telugu 
- Urdu

You can specify one or more languages using the `language` option. Example:
```js
cleanText('some text', { language: ['hindi', 'english'] });
```

---

## Contributing

1. **Fork** this repository and clone your fork.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Add or improve abusive word lists in `src/abuse_words.js`.
4. Add or update tests in `Test/cleanText.test.js`.
5. Run tests:
   ```sh
   npm test
   ```
6. Submit a pull request with a clear description of your changes.

**Guidelines:**
- Please be respectful and avoid adding non-abusive or irrelevant words.
- Keep word lists accurate and up-to-date for each language.
- Add tests for any new features or language support.

---

## Author

Developed with ❤️ by [Nabarup](https://github.com/nabarupdev)

If you find this package useful, ⭐ star the repo and share it!

## License

[MIT](LICENSE) © 2025 Nabarup.  
Use freely. Contribute with respect.

![npm version](https://img.shields.io/npm/v/cleantext)
![npm downloads](https://img.shields.io/npm/dm/cleantext)
![MIT License](https://img.shields.io/badge/license-MIT-green)

## Feedback & Contact

For feature requests, feedback, or bug reports, open an [issue](https://github.com/nabarupdev/cleantext/issues) or email me at nabaruproy.dev@gmail.com .
