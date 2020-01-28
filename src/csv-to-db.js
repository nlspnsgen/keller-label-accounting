const mongoose = require( 'mongoose');
const csv = require ('csvtojson');
const fs = require ('fs');

mongoose.connect('mongodb://localhost:27017/keller', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("db connected!");
});

export const updateArtist = () =>{
    
}

