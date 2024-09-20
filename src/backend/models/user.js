// models/user.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  ip: { type: String },
  token: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
