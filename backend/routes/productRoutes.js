const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // or use static data if needed
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Product
router.post('/create', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Products by Category
router.get('/category/:categoryName', async (req, res) => {
  try {
    // Step 1: find the Category document
    const categoryDoc = await Category.findOne({ name: req.params.categoryName });

    if (!categoryDoc) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Step 2: fetch products using the category ObjectId
    const products = await Product.find({ category: categoryDoc._id });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/filter', async (req, res) => {
  try {
    const { categoryName, brandNames, minPrice, maxPrice } = req.query;
    const filter = {};

    // Match category by name
    if (categoryName) {
      const categoryDoc = await Category.findOne({ name: categoryName });
      if (!categoryDoc) {
        return res.status(404).json({ error: 'Category not found' });
      }
      filter.category = categoryDoc._id;
    }

    let brandList = [];

    if (Array.isArray(brandNames)) {
      brandList = brandNames;
    } else if (typeof brandNames === 'string') {
      brandList = brandNames.split(',');
    }

    if (brandList.length > 0) {
      const brandDocs = await Brand.find({ name: { $in: brandList } });
      if (!brandDocs.length) {
        return res.status(404).json({ error: 'No matching brands found' });
      }
      const brandIds = brandDocs.map((b) => b._id);
      filter.brand = { $in: brandIds };
    }

    if (minPrice && maxPrice) {
      filter.price = {
        $gte: parseFloat(minPrice),
        $lte: parseFloat(maxPrice)
      };
    }

    const products = await Product.find(filter).populate("brand", "name");
    res.json(products);
  } catch (error) {
    console.error('Error in /filter:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('brand', 'name').populate('category', 'name');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
