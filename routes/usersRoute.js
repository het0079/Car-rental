const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.send(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.send({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});
module.exports = router;
