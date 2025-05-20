const express = require("express");
const router = express.Router();
const UserData = require("../models/UserData");

// POST /api/usersdata/adddataitems
router.post("/adddataitems", async (req, res) => {
  try {
    const { name, mobile, gender, age, landlordUsername, listingName } = req.body;

    // Basic validation
    if (
      !name ||
      !mobile ||
      !gender ||
      !age ||
      !landlordUsername ||
      !listingName
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newUserData = new UserData({
      name,
      mobile,
      gender,
      age,
      landlordUsername,
      listingName,
    });

    await newUserData.save();
    res.status(201).json({ message: "User data saved successfully." });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
