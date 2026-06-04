const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_URL = process.env.BOT_URL || '';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/pair', async (req, res) => {
  try {
    const response = await axios.post(`${BOT_URL}/pair`, req.body, { timeout: 30000 });
    res.json(response.data);
  } catch (err) {
    res.json({ error: 'Bot is offline. Please try again later.' });
  }
});

app.get('/check-user', async (req, res) => {
  try {
    const response = await axios.get(`${BOT_URL}/check-user?phone=${req.query.phone}`, { timeout: 10000 });
    res.json(response.data);
  } catch (err) {
    res.json({ exists: false });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
