const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Track = require('../models/Track');
const auth = require('../middleware/auth');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  const { title, artist, album } = req.body;
  const file = req.file;
  const track = await Track.create({
    title, artist, album,
    filename: file.filename,
    uploadedBy: req.user.id
  });
  res.json(track);
});

// Streaming with Range support
router.get('/stream/:id', async (req, res) => {
  const id = req.params.id;
  const track = await Track.findById(id);
  if(!track) return res.status(404).send('Not found');
  const filePath = path.resolve(__dirname, '..', 'uploads', track.filename);
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = (end - start) + 1;
    const stream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'audio/mpeg'
    });
    stream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mpeg'
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

router.get('/', async (req, res) => {
  const tracks = await Track.find().limit(100);
  res.json(tracks);
});

module.exports = router;
