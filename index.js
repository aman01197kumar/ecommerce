
import express from 'express';
// const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`<img src="/images/Media.jpg" alt="express logo" />`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
