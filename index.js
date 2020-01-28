const mongoose = require( 'mongoose');
const artistController = require('./src/controllers/artist-controller');

mongoose.connect('mongodb://localhost:27017/keller', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  artistController.save("testArtist");
  console.log("db connected!");
});

