const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Employee = require('../models/Employee'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder to store profile pictures
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

router.get('/by-email/:email', async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.params.email }).select('-password -otp -otpExpiresAt');
    if (!employee) return res.status(404).json({ message: 'User not found' });
    res.json(employee);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/by-email/:email', upload.single('avatar'), async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.params.email });
    if (!employee) return res.status(404).json({ message: 'User not found' });

    const {
      name,
      username,
      dob,
      phone,
      presentAddress,
      permanentAddress,
      postalCode,
      city,
      country,
      aboutMe,
      role
    } = req.body;

    // 🛠️ Update only editable fields
    employee.name = name  || employee.name;
    employee.username = username || employee.username;
    employee.dob = dob || employee.dob;
    employee.phone = phone || employee.phone;
    employee.presentAddress = presentAddress || employee.presentAddress;
    employee.permanentAddress = permanentAddress || employee.permanentAddress;
    employee.postalCode = postalCode || employee.postalCode;
    employee.city = city || employee.city;
    employee.country = country || employee.country;
    employee.aboutMe = aboutMe || employee.aboutMe;
    employee.role = role || employee.role;

    if (req.file) {
      employee.avatar = `/uploads/${req.file.filename}`;
    }

    await employee.save();
    res.json({ message: 'Profile updated successfully', data: employee });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
