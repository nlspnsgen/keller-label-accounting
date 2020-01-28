var mongoose = require('mongoose');

var ReleaseSchema = new mongoose.Schema({
    isrc: String,
    artistIds: Array,
    royaltyPercentages: Array,
    title: String,
    royalty: Number
});

module.exports = mongoose.model('Release', ReleaseSchema);