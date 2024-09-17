// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt'); // If using password hashing
const jwt = require('jsonwebtoken'); // If using JWT for tokens
const validateToken = require('../middleware/auth-middleware');


// Login route
router.post('/login', validateToken, async (req, res) => {
  const { id, token } = req.body;

  try {
    const user = await User.findOne({ id, token });

    if (user) {
      // Successfully authenticated
      res.json({ success: true, message: 'Login successful', user });
    } else {
      // Authentication failed
      res.status(401).json({ success: false, message: 'Invalid ID or token' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Register route (for initial login)
router.post('/register', async (req, res) => {
  const { id, name, email, ip, token } = req.body;

  try {
    const existingUser = await User.findOne({ id });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = new User({ id, name, email, ip, token });
    await newUser.save();
    res.json({ success: true, message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

module.exports = router;
