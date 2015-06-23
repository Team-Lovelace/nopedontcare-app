var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nope');

var User = require('../lib/users.js');

var createUserOne = function(done){
  User.create({
    name: 'courtney',
    email: 'courtneys@gmail.com',
    bio: 'I like going to the pool and chocolate milk',
    profilePic: 'https://scontent.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/382991_2353714370232_1390898971_n.jpg?oh=460af6f829b22f7648fcc4a3b0e65215&oe=5625EE04'
  }, done);
};

async.series([
  createUserOne
  ],
    function(err){
      if(err){
        console.log(err);
      }
      mongoose.disconnect();
    }
  );


// var userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     match: /\S+@\S+\.\S+/
//   },
//   bio: {
//     type: String
//   },
//   profilePic:{
//     type: String,
//     required: true
//   },
//   posts: [postSchema]

// });
