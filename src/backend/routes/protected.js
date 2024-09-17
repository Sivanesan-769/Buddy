// routes/protected.js
const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/auth-middleware');

// Example of a protected route
router.get('/protected', validateToken, (req, res) => {
  res.json({ success: true, message: 'Access granted', user: req.user });
});

module.exports = router;
