
const express = require('express');

const router = express.Router();

// Example GET route
router.get('/', (req, res) => {
  res.send('I am just trying to work on routes');
});

router.get('/home', (req, res) => {
  res.send('Just believe you can do it and you will.');
});

router.get('/backend', (req, res) => {
  res.send('I like backend development');
});

// Example POST route
router.post('/', (req, res) => {
  const data = req.body;
  res.send(`You sent: ${JSON.stringify(data)}`);
});

module.exports = router;
