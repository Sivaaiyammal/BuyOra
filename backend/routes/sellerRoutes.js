const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

router.post('/', async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).json({ message: 'Seller added successfully', seller });
  } catch (err) {
    if (err.code === 11000 && err.keyValue.email) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      console.error('Failed to add seller:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
});

router.get('/next-id', async (req, res) => {
  try {
    const lastSeller = await Seller.findOne().sort({ createdAt: -1 });
    const lastSellerId = lastSeller ? parseInt(lastSeller.sellerId.replace('SLR', '')) : 1000;
    const nextSellerId = `SLR${lastSellerId + 1}`;
    res.status(200).json({ sellerId: nextSellerId });
  } catch (err) {
    console.error('Failed to fetch next seller ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (err) {
    console.error('Failed to fetch sellers:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;