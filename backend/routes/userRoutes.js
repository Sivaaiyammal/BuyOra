const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find({}, '-password');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
