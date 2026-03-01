const mongoose = require('mongoose');
const PlaylistSchema = new mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
  public: { type: Boolean, default: false }
});
module.exports = mongoose.model('Playlist', PlaylistSchema);
