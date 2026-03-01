const express = require('express');
const router = express.Router();
const Track = require('../models/Track');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Search tracks by title or artist
router.get('/', async (req, res) => {
  const q = req.query.search || '';
  const query = q
    ? {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { artist: { $regex: q, $options: 'i' } },
        ],
      }
    : {};
  const tracks = await Track.find(query).limit(50);
  res.json(tracks);
});

// Like / Unlike track
router.post('/:id/like', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const trackId = req.params.id;

