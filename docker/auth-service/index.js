// index.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from auth-service');
});

app.listen(PORT, () => {
  console.log(`Auth service running on http://localhost:${PORT}`);
});
