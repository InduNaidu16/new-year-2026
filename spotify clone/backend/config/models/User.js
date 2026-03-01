const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed
  likedTracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }]
});
module.exports = mongoose.model('User', UserSchema);
