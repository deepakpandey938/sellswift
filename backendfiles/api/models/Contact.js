// backend/models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userEmail: String,
  message: String,
  listingId: String,
  landlordId: String,
  date: Date
});

module.exports = mongoose.model('Contact', contactSchema);
