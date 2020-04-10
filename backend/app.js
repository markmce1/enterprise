const express = require('express');
const bodyparser  = require('body-parser');
const app = express(); //exported later

const Post = require('./models/post');

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
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    res.status(201).json({
        message: 'posts added successfully'
    });
});

app.get('/api/posts',(req,res,next)=>{
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
        posts,
        );

});

module.exports = app; //this is what I mean by export later