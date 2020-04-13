const express = require("express");
const routing = express.Router();
const listingsAndReview= require('../models/listings');

routing.post("", (req,res,next) => {
    const listing = new listingsAndReview({
        name: req.body.name,
        summary: req.body.summary,
        location: req.body.location,
        description: req.body.description
    });
    listing.save().then(createdListing =>{
        res.status(201).json({
            message: 'listing added successfully',
            listingId: createdListing._id
        });
    });

});

routing.put("/:id",(req,res,next) =>{
    const listing = new listingsAndReview({
        _id: req.body.id,
        name: req.body.name,
        summary: req.body.summary,
        location: req.body.location,
        description: req.body.description

    });
    listingsAndReview.updateOne({ _id: req.params.id}, listing).then(result => {
        res.status(200).json({message:'Update successful'})
    })
});

routing.get('',(req,res,next)=>{
    listingsAndReview.find().then(documents => {
        res.status(200).json({
            message: "Listings fetched successfully!",
            listing: documents
          });
    });


});

routing.get('/:id',(req,res,next)=>{
    listingsAndReview.findById(req.params.id).then(listing => {

        if(listing){
            res.status(200).json(listing);

        }else{
            res.status(404).json({message: 'Listing not found!'})
        }

    });


});

routing.delete("/:id",(req,res,next)=>{
    listingsAndReview.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({message:"Listing deleted"})
    });
});

module.exports = routing;