const express = require('express');

const app = express(); //exported later

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

app.use('/api/posts',(req,res,next)=>{
    const posts = [
        { 
         id: 'sdhasdsad',
         title: 'First SS post',
         content: ' from server'
        },
        { 
            id: 'sddasdasdafadsfdfgd',
            title: 'Second SS post',
            content: ' from server'
        }

    ]; 
    res.status(200).send(
        posts);

});

module.exports = app; //this is what I mean