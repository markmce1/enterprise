const express = require('express');
const bodyparser  = require('body-parser');
const app = express(); //exported later
const mongoose = require("mongoose");
const path = require("path");

const listingRoutes = require("./routes/listings");
const authRoutes = require("./routes/auth");

mongoose.connect("mongodb+srv://markmce:rMfZLJHQBCMCE0RT@enterpriseproject-ab1wl.mongodb.net/sample_airbnb?retryWrites=true&w=majority")
    .then(() => 
    {
        console.log('Connected')
    })
    .catch(() => {
        console.log('Connection failed!')
    })
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use("/images", express.static(path.join("backend/images")));
app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
     'Access-Control-Allow-Headers',
     'Origin, X-Request-With, Content-Type, Accept, authorization ');
     res.setHeader(
     'Access-Control-Allow-Methods', 
     'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

module.exports = app;