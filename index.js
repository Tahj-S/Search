require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/search', async (req, res) => {
  const query = req.query.q;
  const customsearch = google.customsearch('v1');
  const result = await customsearch.cse.list({
    cx: process.env.CSE_ID,
    q: query,
    auth: process.env.API_KEY_PLACEHOLDER,
  });
  res.json(result.data);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

