const express = require('express');
const bodyparser  = require('body-parser');
const app = express(); //exported later
const mongoose = require("mongoose");

const listingRoutes = require("./routes/listings");


mongoose.connect("mongodb+srv://markmce:rMfZLJHQBCMCE0RT@enterpriseproject-ab1wl.mongodb.net/sample_airbnb?retryWrites=true&w=majority")
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
     'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use("/api/listings", listingRoutes);

module.exports = app;