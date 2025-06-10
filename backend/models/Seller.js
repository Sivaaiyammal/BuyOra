const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  sellerId: { type: String, unique: true }, 
  sellerName: { type: String, required: true },
  name: { type: String },
  brandName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  identityVerification: { type: String, required: true },
  gstNumber: { type: String, required: true },
  website: { type: String },
  address: { type: String, required: true },
  pinCode: { type: String, required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  productCategories: { type: String, required: true },
  status: { type: String, default: "Pending" },
}, { timestamps: true });


sellerSchema.pre('save', async function (next) {
    if (!this.name) {
    this.name = this.sellerName; 
  }

  if (!this.sellerId) {
    const lastSeller = await mongoose.model('Seller').findOne().sort({ createdAt: -1 });
    const lastSellerId = lastSeller ? parseInt(lastSeller.sellerId.replace('SLR', '')) : 1000;
    this.sellerId = `SLR${lastSellerId + 1}`;
  }
  next();
});

module.exports = mongoose.model('Seller', sellerSchema);