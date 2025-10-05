const express = require('express');
const bodyParser = require('body-parser');
const { cleanText } = require('./index');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/clean', (req, res) => {
  const { text, options } = req.body;
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "text" field in request body.' });
  }
  try {
    // Default to both Hindi and English if no options provided
    const defaultOptions = {
      language: ['hindi', 'english'],
      grawlixChar: '*'
    };
    const cleanOptions = options ? { ...defaultOptions, ...options } : defaultOptions;
    const cleaned = cleanText(text, cleanOptions);
    res.json({ cleaned });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
