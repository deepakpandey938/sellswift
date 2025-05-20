// backend/routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // mongoose model

router.post('/', async (req, res) => {
  const { userId, userName, userEmail, message, listingId, landlordId } = req.body;

  if (!message || !userId || !listingId || !landlordId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newContact = new Contact({
      userId,
      userName,
      userEmail,
      message,
      listingId,
      landlordId,
      date: new Date()
    });

    await newContact.save();
    res.status(200).json({ message: 'Contact message saved' });
  } catch (err) {
    console.error('Contact Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
