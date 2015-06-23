var mongoose = require('mongoose');

var postSchema = require('./posts.js');

var userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /\S+@\S+\.\S+/
  },
  bio: {
    type: String
  },
  profilePic:{
    type: String,
    required: true
  },
  posts: [postSchema]

});

var User = mongoose.model('User', userSchema);

module.exports = User;
