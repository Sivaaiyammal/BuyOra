const mongoose = require('mongoose');

const AdminRoleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['Super User', 'User'], required: true },
  email_or_phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const AdminRoleModel = mongoose.model('AdminRole', AdminRoleSchema);
module.exports = AdminRoleModel;
