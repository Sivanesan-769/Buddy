// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt'); // If using password hashing
const jwt = require('jsonwebtoken'); // If using JWT for tokens
const validateToken = require('../middleware/auth-middleware');
const CryptoJS = require("crypto-js");
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

// Login route
router.post('/login', async (req, res) => {
  const { _data } = req.body;
  const decryptData = decrypt(_data);
  const decryptedObj = JSON.parse(decryptData);
  const { id, token } = decryptedObj;

  try {
    const user = await User.findOne({ id });

    if (user) {
      // Successfully authenticated
      const req = encrypt(JSON.stringify(user));
      const reqData = {
        _data: req
      }
      res.json({ success: true, message: 'Login successful', reqData });
    } else {
      // Authentication failed
      res.status(401).json({ success: false, message: 'Invalid token' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Register route (for initial login)
router.post('/register', async (req, res) => {
  const { _data } = req.body;
  const decryptData = decrypt(_data);
  const decryptedObj = JSON.parse(decryptData);
  var { id, name, email, ip, token } = decryptedObj;
  try {
    const existingUser = await User.findOne({ id });

    if (existingUser) {
      const req = encrypt(JSON.stringify(existingUser));
      const user = {
        _data: req
      }
      return res.status(400).json({ success: false, message: 'User already exists', user});
    }
    token = encrypt(id);
    const newUser = new User({ id, name, email, ip, token });
    await newUser.save();
    const req = encrypt(JSON.stringify(newUser));
      const user = {
        _data: req
      }
    res.json({ success: true, message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

function encrypt(data) {
  return CryptoJS.AES.encrypt(data, process.env.SECRET_KEY).toString();
}

function decrypt(data) {
  const bytes = CryptoJS.AES.decrypt(data, process.env.SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = router;

