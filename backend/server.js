// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  landlordUsername: { type: String, required: true },
  listingName: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// POST: Add user data
app.post("/api/usersdata/adddataitems", async (req, res) => {
  const { name, mobile, gender, age, landlordUsername, listingName } = req.body;

  // Basic validation
  if (
    !name ||
    !/^\d{10}$/.test(mobile) ||
    !gender ||
    !age ||
    age < 1 ||
    age > 120 ||
    !landlordUsername ||
    !listingName
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const newUser = new User({
      name,
      mobile,
      gender,
      age,
      landlordUsername,
      listingName,
    });
    await newUser.save();
    res.status(201).json({ message: "User data saved successfully" });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch all users data (optional)
app.get("/api/usersdata", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
