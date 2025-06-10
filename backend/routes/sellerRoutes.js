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
    // Fetch the seller with the highest numeric sellerId
    const result = await Seller.aggregate([
      {
        $match: {
          sellerId: { $regex: /^SLR\d+$/ }, // Match sellerId starting with "SLR" followed by digits
        },
      },
      {
        $project: {
          numericId: {
            $toInt: { $substr: ["$sellerId", 3, -1] }, // Extract numeric part of sellerId
          },
        },
      },
      { $sort: { numericId: -1 } }, // Sort by numericId in descending order
      { $limit: 1 }, // Get the highest numericId
    ]);

    const lastNumber = result.length > 0 ? result[0].numericId : 1000; // Default to 1000 if no sellers exist
    const nextSellerId = `SLR${lastNumber + 1}`; // Increment the numeric part and prepend "SLR"
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