const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const rp = require('request-promise');
const mongoose = require('mongoose');
const moment = require('moment');
const methodOverride = require('method-override');
const expressSanitizer= require('express-sanitizer');


mongoose.connect('mongodb://localhost:27017/blog_demo', {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const userSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    posts: [postSchema]
});

const Post = mongoose.model('Post', postSchema);

const User = mongoose.model('User', userSchema);



// let newPost = new Post({
//     title: 'first post title',
//     content: 'first post content'
// });
//
// newPost.save(function (err, post) {
//    if(err){
//        console.log(err);
//    } else {
//        console.log(post)
//    }
// });

// let newUser = new User({
//     fName: 'Harry',
//     lName: 'Poter',
//     email: 'harry.poter@gmail.com'
// });

newUser.posts.push({
    title: 'something weird',
    content: 'zoo zoo'
});


newUser.save(function (err, user) {
    if(err){
        console.log(err);
    } else {
        console.log(user)
    }
});

app.use(express.static('themes')) ;  // FE is served from this folder
app.use(bodyParser.urlencoded({extend: true}));  // we need this to gather data from forms
app.use(methodOverride('_method')); // it’s used to convert post method to DELETE and PUT
app.use(expressSanitizer());  // sanitizes the incoming data from potentially malicious code
app.set('view engine', 'ejs');   // with this we do not have to use .ejs @ res.render


app.get('/', function(req, res){
    res.render('home');
});

app.get('/', function(req, res){
    res.render('home');
});


app.get('*', function(req, res){
    res.send('404');
});

app.listen(8016);
