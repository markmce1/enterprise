const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    location: {type: String},
    name: {type: String},
    summary: {type: String},
    description: {type:String}
});

module.exports = mongoose.model('listingsAndReview',postSchema);