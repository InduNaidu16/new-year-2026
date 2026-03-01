const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
const auth = require('../middleware/auth');

// Create new playlist
router.post('/', auth, async (req, res) => {
  try {
    const { name, trackIds, isPublic } = req.body;
    const playlist = await Playlist.create({
      name,
      owner: req.user.id,
      tracks: trackIds || [],
      public: isPublic || false
    });
    res.json(playlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a track to an existing playlist
router.post('/:id/add', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });

    const { trackId } = req.body;
    if (!playlist.tracks.includes(trackId)) {
      playlist.tracks.push(trackId);
      await playlist.save();
    }
    res.json(playlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all playlists of the logged-in user
router.get('/mine', auth, async (req, res) => {
  const lists = await Playlist.find({ owner: req.user.id }).populate('tracks');
  res.json(lists);
});

// Get a single playlist with its tracks
router.get('/:id', async (req, res) => {
  const list = await Playlist.findById(req.params.id).populate('tracks');
  if (!list) return res.status(404).json({ error: 'Playlist not found' });
  res.json(list);
});

module.exports = router;
