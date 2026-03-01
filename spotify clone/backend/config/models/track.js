const mongoose = require('mongoose');
const TrackSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  filename: String, // stored filename in /uploads
  duration: Number,
  coverUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Track', TrackSchema);
