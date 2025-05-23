const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

router.post('/create', async (req, res) => {
  const { name, slug } = req.body;

  const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
  if (existing) {
    return res.status(409).json({ error: 'Category already exists' });
  }

  const category = new Category({ name, slug });
  await category.save();
  res.status(201).json(category);
});

router.put('/:id', async (req, res) => {
  const { name, slug } = req.body;
  const updated = await Category.findByIdAndUpdate(req.params.id, { name, slug }, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});


module.exports = router;
