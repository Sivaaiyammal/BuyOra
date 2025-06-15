const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

router.post("/", async (req, res) => {
  try {
    // console.log("Received body:", req.body);
    const seller = new Seller(req.body); // This may throw if schema doesn't match
    await seller.save();
    res.status(201).json({ message: "Seller created", seller });
  } catch (error) {
    console.error("Seller save error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
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
    const sellers = await Seller.find().populate("productCategories", "name");;
    res.status(200).json(sellers);
  } catch (err) {
    console.error('Failed to fetch sellers:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const seller = await Seller.findOne({ sellerId: req.params.id }).populate("productCategories", "name");
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.json(seller);
  } catch (error) {
    console.error('Failed to fetch seller by ID:', error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { status, reason } = req.body;

    const update = { status };
    if (status === "Rejected" && reason) {
      update.rejectionReason = reason;
    }

    const seller = await Seller.findOneAndUpdate(
      { sellerId: req.params.id },
      update,
      { new: true }
    );

    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.json({ message: "Status updated", seller });
  } catch (err) {
    console.error("Status update failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;