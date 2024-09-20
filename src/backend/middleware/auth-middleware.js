// middleware/authMiddleware.js
const User = require('../models/user');

async function validateToken(req, res, next) {
  // Extract token from request headers
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    // Find user with the provided token
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // If token is valid, attach user to request object
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
}

module.exports = validateToken;
