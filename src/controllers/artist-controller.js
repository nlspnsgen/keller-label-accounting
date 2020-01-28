const Artist = require("../models/Artist");

let artistController = {};

// Save new artist
artistController.save = function(artistName) {
    const artist = new Artist({name: artistName});
    artist.save(function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("Successfully created an artist.");
      }
    });
};

module.exports = artistController;