const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// router.get('/category-counts', async (req, res) => {
//   try {
//     const counts = await Product.aggregate([
//       { $match: { category: { $ne: null } } },
//       { $group: { _id: "$category", count: { $sum: 1 } } },
//       { $project: { _id: 0, category: "$_id", count: 1 } }
//     ]);
//     res.json(counts);
//   } catch (err) {
//     console.error("Category counts error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

const mongoose = require('mongoose');

router.get('/category-counts', async (req, res) => {
  try {
    const counts = await Product.aggregate([
      { $match: { category: { $ne: null } } },
      {
        $group: {
          _id: { $toObjectId: "$category" },
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      { $unwind: "$categoryInfo" },
      {
        $project: {
          _id: 0,
          category: "$categoryInfo.name",
          count: 1
        }
      }
    ]);

    res.json(counts);
  } catch (err) {
    console.error("Category counts error:", err);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;