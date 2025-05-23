const express = require('express');
const Brand = require('../models/Brand');
const router = express.Router();

router.post('/create', async (req, res) => {
  const { name, slug } = req.body;

  const existing = await Brand.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
  if (existing) {
    return res.status(409).json({ error: 'Brand already exists' });
  }

  const brand = new Brand({ name, slug });
  await brand.save();
  res.status(201).json(brand);
});

router.put('/:id', async (req, res) => {
  const { name, slug } = req.body;
  const updated = await Brand.findByIdAndUpdate(req.params.id, { name, slug }, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
});


module.exports = router;
