const express = require('express');
const bodyparser  = require('body-parser');
const app = express(); //exported later
const mongoose = require("mongoose");
const Place = require('./models/post');


mongoose.connect("mongodb+srv://markmce:rMfZLJHQBCMCE0RT@enterpriseproject-ab1wl.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() =>
    {
        console.log('Connected')
    })
    .catch(() => {
        console.log('Connection failed!')
    })
app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({extended:false}));
app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
     'Access-Control-Allow-Headers',
     'Origin, X-Request-With, Content-Type, Accept');
     res.setHeader(
     'Access-Control-Allow-Methods', 
     'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post("/api/posts", (req,res,next) => {
    const post = new Place({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({
        message: 'posts added successfully'
    });
});

app.get('/api/posts',(req,res,next)=>{
    Place.find().then(documents => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: documents
          });
    });


});

module.exports = app; //this is what I mean by export later