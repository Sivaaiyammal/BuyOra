const express = require("express");
const router = express.Router();
const { login, register, resetPassword, verifyOtp } = require("../controllers/authController");
const Employee = require('../models/Employee'); 

// Get all admin users
router.get('/admins', async (req, res) => {
  try {
    const admins = await Employee.find({ role: { $ne: 'user' } }).sort({ createdAt: -1 });
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admins' });
  }
});

// Update admin
router.put('/admins/:id', async (req, res) => {
  const { name, role, email, phone } = req.body;
  try {
    await Employee.findByIdAndUpdate(req.params.id, { name, role, email, phone });
    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update admin' });
  }
});

// Delete admin
router.delete('/admins/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete admin' });
  }
});

router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


// Other routes
router.post("/login", login);
router.post("/register", register);
router.post("/reset-password", resetPassword);
router.post("/verify-otp", verifyOtp);

module.exports = router;
