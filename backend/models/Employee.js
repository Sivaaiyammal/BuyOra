const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
  role: String,
  avatar: String,
  dob: Date,
  presentAddress: String,
  permanentAddress: String,
  postalCode: String,
  city: String,
  country: String,
  aboutMe: String,
  otp: String,
  otpExpiresAt: Date   
},{ timestamps: true });

EmployeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Employee", EmployeeSchema);