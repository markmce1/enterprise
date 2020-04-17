const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
    location: {type: String, required: true},
    name: {type: String,required: true},
    summary: {type: String,required: true},
    description: {type:String,required: true},
    imagePath:{type:String,required: true},
    creator: {type: mongoose.Schema.Types.ObjectId,ref:"Auth", require:true}
});

module.exports = mongoose.model('listingsAndReview',listingSchema);