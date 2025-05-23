const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const productImageDir = path.join(__dirname, '..', 'uploads', 'product-image');
if (!fs.existsSync(productImageDir)) fs.mkdirSync(productImageDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, productImageDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

router.post('/product-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageUrl = `http://localhost:5000/uploads/product-image/${req.file.filename}`;
  res.json({ imageUrl });
});

router.put('/update/:id', async (req, res) => {
  try {
    const { removedImages = [] } = req.body;

    // 1. Delete old images from disk
    removedImages.forEach(url => {
      const filename = url.split('/uploads/product-image/')[1];
      const filePath = path.join(__dirname, '..', 'uploads', 'product-image', filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    // 2. Update product with new images
    const updated = await Product.findByIdAndUpdate(req.params.id, {
      ...req.body,
      images: req.body.images, // the updated image URLs
    }, { new: true });

    res.json({ message: 'Product updated', product: updated });

  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

module.exports = router;
