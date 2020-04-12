const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    listingurl: {type: String},
    name: {type: String},
    summary: {type: String}
});

module.exports = mongoose.model('listingsAndReview',postSchema);