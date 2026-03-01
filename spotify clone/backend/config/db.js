const mongoose = require('mongoose');

module.exports = function connectDB(){
  const uri = process.env.MONGO_URI || 'mongodb://localhost/spotify_clone';
  return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
};
