var mongoose = require('mongoose');

var BundleSchema = new mongoose.Schema({
    catalogNr: String,
    quarter: String,
    artistIds: Array,
    royaltyPercentages: Array,
    royalty: Number
});

module.exports = mongoose.model('Bundle', BundleSchema);