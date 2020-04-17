const express = require("express");
const multer = require("multer");
const routing = express.Router();
const listingsAndReview= require('../models/listings');
const checkAuth = require("../middleware/check-auth");

const  MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if(isValid){
            error = null;
        }
        cb(error,"backend/images");//pathing from the server.js file
    },
    filename:(req,file,cb)=>{
        const fname =file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,fname + '-' + Date.now()+ '.'+ext );
    }
});

routing.post("",checkAuth,multer({storage:storage}).single("image"), (req,res,next) => {
    const url = req.protocol + '://' + req.get("host");
    const listing = new listingsAndReview({
        name: req.body.name,
        summary: req.body.summary,
        location: req.body.location,
        description: req.body.description,
        imagePath: url + "/images/" + req.file.filename
    });
    listing.save().then(createdListing =>{
        res.status(201).json({
            message: 'listing added successfully',
            listing:{
                id:createdListing._id,
                name:createdListing.name,
                summary:createdListing.summary,
                location:createdListing.location,
                description:createdListing.description,
                imagePath:createdListing.imagePath
            }
        });
    });

});

routing.put("/:id",checkAuth,multer({storage:storage}).single("image"),(req,res,next) =>{
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename;

     }
    const listing = new listingsAndReview({
        _id: req.body.id,
        name: req.body.name,
        summary: req.body.summary,
        location: req.body.location,
        description: req.body.description,
        imagePath:imagePath

    });
    listingsAndReview.updateOne({ _id: req.params.id}, listing).then(result => {
        res.status(200).json({message:'Update successful'})
    })
});

routing.get('',(req,res,next)=>{
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const listingQuery = listingsAndReview.find();
    let fetchedListings;
    if(pageSize && currentPage){
        listingQuery
        .skip(pageSize * (currentPage-1))
        .limit(pageSize);
    }
    listingQuery.then(documents => {
        fetchedListings = documents;
        return listingsAndReview.count();
    })
    .then(count => {
        res.status(200).json({
            message: "Listings fetched successfully!",
            listing: fetchedListings,
            maxListings: count
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

routing.delete("/:id",checkAuth,(req,res,next)=>{
    listingsAndReview.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({message:"Listing deleted"})
    });
});

module.exports = routing;