var mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Artist', ArtistSchema);