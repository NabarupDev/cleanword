
# No Gaali Zone 🚫

Welcome to **No Gaali Zone**! This is a friendly, open-source tool for Node.js that helps you keep your apps, chats, and communities clean by automatically censoring abusive words in many Indian and international languages. Whether you’re building a chat app, a forum, or just want to keep things civil, this package has your back.

---

## ✨ Why use No Gaali Zone?

- **Multilingual**: Censors bad words in Hindi, Bengali, Assamese, and more.
- **Unicode Smart**: Handles Indian scripts, diacritics, and all those tricky characters.
- **Fast & Lightweight**: Uses JavaScript Sets for super-quick lookups.
- **Easy to Extend**: Add your own words if you want.
- **API Ready**: Comes with a plug-and-play Express.js REST API server.
- **Tested**: Reliable, with tests included.

---

## 🚀 Getting Started

Install it with npm:

```bash
npm install no-gaali-zone
```

---

## 🛠️ How to Use

### 1. As a Library

```js
const { cleanText } = require('no-gaali-zone');

const input = 'Multiple languages: khacchar, गाली, kutto, chudi, চুদি , haramkhor, साला, ৰাণ্ডী';
const cleaned = cleanText(input);
console.log(cleaned); // All abusive words are now asterisks!
```

### 2. With Your Own Word List

Want to block your own set of words? No problem:

```js
const { cleanText, buildAbuseSet } = require('no-gaali-zone');
const myWords = ['badword1', 'badword2'];
const mySet = buildAbuseSet(myWords);
const cleaned = cleanText('badword1 is here', mySet);
```

### 3. As an API Server

Spin up the server:

```bash
node server.js
```

Then send a POST request (for example, with curl or Postman):

```bash
curl -X POST http://localhost:3000/clean -H "Content-Type: application/json" -d '{"text": "Type any abusive word here to check."}'
```

You’ll get back:

```json
{
  "cleaned": "Type any abusive word here to check."
}
```

---

## 📚 API Reference

### `cleanText(text, [customAbuseSet])`
- `text` (string): The text you want to clean.
- `customAbuseSet` (Set, optional): Your own set of words to block. If you skip this, the built-in list is used.
- **Returns:** The cleaned text, with abusive words replaced by asterisks (same length as the word).

### `buildAbuseSet(words)`
- `words` (array): An array of words you want to block.
- **Returns:** A Set for fast lookups.

---

## 🧪 Running Tests

```bash
npm test
```

---

## 🤝 Contributing

Found a bug? Want to add more words or languages? Suggestions are always welcome! Please open an issue or a pull request. Let’s make the internet a little kinder, together.

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 👤 Author

Made with ❤️ by Nabarup Roy