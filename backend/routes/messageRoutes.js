const express = require('express');
const router = express.Router();

let messages = []; // Temporary in-memory store

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const userMessages = messages.filter(msg => msg.to === userId);
  res.json(userMessages);
});

router.post('/', (req, res) => {
  const { to, text, time } = req.body;
  const newMessage = { to, text, time };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

module.exports = router;
