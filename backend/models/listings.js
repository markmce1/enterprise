const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
    location: {type: String},
    name: {type: String},
    summary: {type: String},
    description: {type:String}
});

module.exports = mongoose.model('listingsAndReview',listingSchema);